from django.http import HttpResponse, JsonResponse, Http404
from django.db.models import Q
from django.shortcuts import render
from django.core.serializers import serialize
from User_Accounts import views
from User_Accounts.models import *
from User_Dashboard.models import *
from User_Accounts.serializers import *
from User_Dashboard.serializers  import *

from .models import *  # Replace with your actual model names




cCO, cCH = 0, 0

# Create your views here.
def dashboard(request):
    return render(request, "dashboard.html", {'title':"Dashboard"})

def module(request):
    return render(request, "module.html", {'title':"Module"})

def editProfile(request):
    return render(request, "editProfile.html", {'title':"Edit Profile"})

def privacyPolicy(request):
    return render(request, "privacy_policy.html", {'title':"Privacy Policy"})

def tAndC(request):
    return render(request, "tAndC.html", {'title':"Terms & Conditions"})

def copyright(request):
    return render(request, "copyright.html", {'title':"Copyright & Information"})

def faq(request):
    return render(request, "faq.html", {'title':"Frequently Asked Questions"})

def get_curriculum_titles(request):
    # Fetching all modules, chapters, and concepts
    modules = Module.objects.all()
    chapters = Chapter.objects.all()
    concepts = KeyConcept.objects.all()

    # Serializing the querysets
    modules_data = serialize('json', modules, fields=('title',))
    chapters_data = serialize('json', chapters, fields=('title',))
    concepts_data = serialize('json', concepts, fields=('title',))

    # Return JSON response
    return JsonResponse({
        'success': True,
        'modules': modules_data,
        'chapters': chapters_data,
        'concepts': concepts_data
    })

        
    
def get_user_data(request, username):
    try:
        cUser = CustomUser.objects.get(uname=username)
        userProgress = UserCurrentProgress.objects.get(user=cUser)
        userAchievements = AchievementTracker.objects.get(user=cUser)

        # Serialize the current module, chapter, concept, and quiz
        current_module_serializer = ModuleSerializer(userProgress.current_module)
        current_chapter_serializer = ChapterSerializer(userProgress.current_chapter)
        # Add serializers for Concept and Quiz if needed

        current_5_chapters = Chapter.objects.filter(module=userProgress.current_module)[:5]
        current_5_chapters_serializer = ChapterSerializer(current_5_chapters, many=True)  # Serialize list of chapters

        user_data = {
            "username": cUser.uname,
            "email": cUser.email,
        }

        currentProgress = {
            "Module": current_module_serializer.data,  # Use serialized data
            "Chapter": current_chapter_serializer.data,
            # Add serialized Concept and Quiz data
        }

        currentAchievements = {
            "Points": userAchievements.points,
            "Coins": userAchievements.coins,
            "Experience": userAchievements.experience,
            "Badge": userAchievements.badge, 
            "Level":userAchievements.level,
        }

       

        # current5Chapters = {
        #     "chapters":
        # }

        return JsonResponse({'success': True, 
                             'userData': user_data, 
                             "progress": currentProgress, 
                             "achievements": currentAchievements,
                             "Chapters": current_5_chapters_serializer.data})  # Use serialized chapters
    
    except CustomUser.DoesNotExist:
        return JsonResponse({'error': 'User does not exist'}, status=404)  # Use JsonResponse for consistency
  

def get_completed_chapters(request, username, module):
    completedChapters = {}
    try:
        print(f"{username} - {module}")
        currentModule = Module.objects.get(title=module)
        module_chapters = Chapter.objects.filter(module = currentModule)

        User = CustomUser.objects.get(uname = username)
        i=1
        for cChapter in module_chapters:
            ch = UserChapterProgress.objects.get(
                Q(user = User) & 
                Q(chapter = cChapter)
            )

            completed_concepts = UserConceptProgress.objects.filter(
                user=User,
                concept__chapter=cChapter,  # This uses the related_name from KeyConcept to Chapter
                completed=True
                ).select_related('concept')  # Optimizes by joining related Concept in the same query

          
            for concept_progress in completed_concepts:
                print(f"Completed Concept: {concept_progress.concept.title}")

    # If you need to return these as part of a view, you might convert them to a list of titles, IDs, etc.
                completed_concept_details = [{'id': cp.concept.id, 'title': cp.concept.title} for cp in completed_concepts]


           

            if (ch.completed):
                completedChapters[i]=len(completed_concepts)
                i += 1
            
        return JsonResponse({'success': True,"completedChapters":completedChapters})
    
    except Module.DoesNotExist:
        return JsonResponse({'error': 'Module does not exist'}, status=401)
    
    except Chapter.DoesNotExist:
        return JsonResponse({'error': 'Chapter does not exist'}, status=402)
    
    except CustomUser.DoesNotExist:
        return JsonResponse({'error': 'User does not exist'}, status=403)
    
    except UserChapterProgress.DoesNotExist:
        return JsonResponse({'error': 'UserChapterProgress does not exist'}, status=405)
    
    


def get_module_with_chapters(request, username, module):
    chapters_data = {}
    cCH = 0
    cCO = 0
    cQu = 1
    try:
        cModule = Module.objects.get(title=module)
        module_chapters = Chapter.objects.filter(module=cModule)
        
        u = UserCurrentProgress.objects.get(user=CustomUser.objects.get(uname = username))
        cQu = u.current_quiz_no

        for chapter in module_chapters:
            a = UserChapterProgress.objects.get(user = CustomUser.objects.get(uname = username), chapter = chapter).completed

            if(a):
                cCH+=1
                print(f"CH {cCH}")
                currentChapter = cCH
            print(chapter.title)
            chapter_data = {
                "title": chapter.title,
                "isCompleted" : a,
                "concepts": {}
            }

            moreconcepts = KeyConcept.objects.filter(chapter=chapter)
            print("Length",len(moreconcepts))
            i=0
            for concept in moreconcepts:
                print(i, " ",concept.title)
                i+=1
                conceptDetail = ConceptDetail.objects.filter(concept=concept).first()
                a = UserConceptProgress.objects.get(user = CustomUser.objects.get(uname = username), concept = concept).completed
                if conceptDetail: 
                    if(a):
                        cCO+=1
                        if(cCO == 3):
                            cCO = 0
                        
                        print(f"Co {cCO}")

                        
                     # Ensure conceptDetail is not None
                    
                    concept_data = {
                        "fact": conceptDetail.fact,
                        "definition_explanation": conceptDetail.definition_explanation,
                        "real_world_example": conceptDetail.real_world_example,
                        "isCompleted": a,
                        "quizzes": {}
                    }
                    print(concept_data)

                    quizzes = Quiz.objects.filter(concept_detail=concept)
                    for quiz in quizzes:
                        quiz_data = {
                            "title": quiz.title,
                            "questions": {}
                        }

                        questions = Question.objects.filter(quiz=quiz)
                        for q in questions:
                            quiz_data["questions"][q.id] = {
                                "title": q.text,
                                "A": q.option_a,
                                "B": q.option_b,
                                "C": q.option_c,
                                "D": q.option_d,
                                "correct_ans": q.correct_answer
                            }

                        concept_data["quizzes"][quiz.id] = quiz_data

                    chapter_data["concepts"][concept.title] = concept_data

            chapters_data[chapter.id] = chapter_data


        return JsonResponse({'success': True, "data": chapters_data, "result": "Success", "cChapter":cCH, "cConcept":cCO, "cQuiz":cQu })

    except Module.DoesNotExist:
        return JsonResponse({'error': 'Module does not exist'}, status=401)
    except Chapter.DoesNotExist:
        return JsonResponse({'error': 'Chapter does not exist'}, status=402)
    except KeyConcept.DoesNotExist:
        return JsonResponse({'error': 'KeyConcept does not exist'}, status=403)
    except ConceptDetail.DoesNotExist:
        return JsonResponse({'error': 'ConceptDetail does not exist'}, status=405)


def updateConcept(request, username, concept):
    try:
       
        cconcept = UserConceptProgress.objects.get(user = CustomUser.objects.get(uname = username), concept = KeyConcept.objects.get(title=concept))

      
        cconcept.completed = True
        cconcept.save()

        cAch = UserCurrentProgress.objects.get(user = CustomUser.objects.get(uname = username))

        cAch.current_quiz_no = cAch.current_quiz_no + 1
        if (cAch.current_quiz_no == 9):
            cAch.current_quiz_no = 10

        print("quiz updated")
        pcon = KeyConcept.objects.get(title=concept).id+1
        cAch.current_concept = KeyConcept.objects.get(id=pcon)
        print("CQUiz ", cAch.current_quiz_no)
        cAch.save()
        return JsonResponse({"success":True})
    
    except UserConceptProgress.DoesNotExist:
        return JsonResponse({'error': 'UserConceptProgress does not exist'}, status=401)
    except CustomUser.DoesNotExist:
        return JsonResponse({'error': 'CustomUser does not exist'}, status=402)
    except KeyConcept.DoesNotExist:

        return JsonResponse({"success":True, 'error': 'KeyConcept does not exist'}, status=407)

def updateChapter(request, username, chapter):
    try:
        cchapter = UserChapterProgress.objects.get(user = CustomUser.objects.get(uname = username), chapter = Chapter.objects.get(title=chapter))

        cchapter.completed = True
        cchapter.save()

        cAch = UserCurrentProgress.objects.get(user = CustomUser.objects.get(uname = username))
        
        ch = Chapter.objects.get(title=chapter).id+1

        cAch.current_chapter = Chapter.objects.get(id=ch)
        print(f"Current Chapter {Chapter.objects.get(id=ch).title}")
        cAch.save() 
        

        return JsonResponse({"success":True})
    
    except UserChapterProgress.DoesNotExist:
        return JsonResponse({'error': 'UserChapterProgress does not exist'}, status=401)
    except CustomUser.DoesNotExist:
        return JsonResponse({'error': 'CustomUser does not exist'}, status=402)
    except Chapter.DoesNotExist:
        return JsonResponse({'error': 'Chapter does not exist'}, status=403)

def updateModule(request, username, module):
    try:
        cmodule = UserModuleProgress.objects.get(user = CustomUser.objects.get(uname = username), module = Module.objects.get(title=module))

        cmodule.completed = True
        cmodule.save()

        cAch = UserCurrentProgress.objects.get(user = CustomUser.objects.get(uname = username))

        cId = Module.objects.get(title=module).id+1
        cAch.current_module = Module.objects.get(id=cId)
        moduleT = cAch.current_module.title
        cAch.save()
        
        return JsonResponse({"success":True, "module":moduleT})
    
    except UserModuleProgress.DoesNotExist:
        return JsonResponse({'error': 'UserModuleProgress does not exist'}, status=401)
    except CustomUser.DoesNotExist:
        return JsonResponse({'error': 'CustomUser does not exist'}, status=402)
    except Module.DoesNotExist:
        return JsonResponse({'error': 'Module does not exist'}, status=403)

def updateQuiz(request, username, quizNo):
    try:
        p = UserCurrentProgress.objects.get(user = CustomUser.objects.get(uname = username))

        p.current_quiz_no = int(quizNo)
        p.save()

        
        return JsonResponse({"success":True})
    
    except UserChapterProgress.DoesNotExist:
        return JsonResponse({'error': 'UserChapterProgress does not exist'}, status=401)
    except CustomUser.DoesNotExist:
        return JsonResponse({'error': 'CustomUser does not exist'}, status=402)


