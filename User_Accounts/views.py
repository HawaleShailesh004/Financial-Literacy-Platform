from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from User_Accounts.models import CustomUser as Cs
from django.contrib.auth import authenticate
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from User_Accounts.models import CustomUser
import re

def index(request):
    return render(request, "index.html")

def login(request):
    if request.method == "POST":
        username_or_email = request.POST.get('uname')
        password = request.POST.get('psw')

       

        print(f"Username : {username_or_email} - {password}")
    
        # Attempt to authenticate the user
        try:
            if(isEmail(username_or_email)):
                user = CustomUser.objects.get(email=username_or_email)
            else:
                user = CustomUser.objects.get(uname=username_or_email)
            print(f"Username: {user.name}, Email: {user.email}, Password: {user.password}")
            if(password == user.password):
                userData = {"un":user.uname, "fn":user.name, "em":user.email}
                return JsonResponse({'success': True, 'message': 'Valid user', 'userdata': userData })
                
            else:
                return JsonResponse({'success': False, 'message': 'Invalid Password'})
        except CustomUser.DoesNotExist:
              return JsonResponse({'success': False, 'message': 'User Does not Exists!'}, status=401)

    elif request.method == "GET":
        return render(request, "login.html")
    else:
        # For other HTTP methods
        return HttpResponse("This HTTP method is not allowed.", status=405)

    # This line should never be reached because all cases are handled above
    # But it's good practice to have a catch-all return at the end
    return HttpResponse("Unexpected error. Please try again.", status=500)

def signUp(request):
    if request.method == "POST":
        fname = request.POST.get('fname')
        uname = request.POST.get('uname')
        email = request.POST.get('email')
        password = request.POST.get('pass')

        # server-side validation
        if not all([fname, uname, email, password]):
            return JsonResponse({'success': False, 'error_message': 'All fields  are required'}, status=400)

        # creating a user 
        user = Cs(name = fname, uname = uname, email = email, password = password)
        user.save()
        print(f"First Name: {fname}, Username: {uname}, Email: {email}")
        print("The Data has been Saved!")

        # Assuming the operation was successful
        print (uname)
        return JsonResponse({'success': True, 'message': 'User created  successfully'})
    
    
    elif request.method == "GET":
        return render(request, "signup.html")

    else:
        # Method Not Allowed
        return JsonResponse({'success': False, 'error_message': 'Invalid request    method'}, status=405)



def quizWelcome(request):
    return render(request, "quiz-welcome.html")

def quiz(request):
    return render(request, "quiz.html")

def dashboard(request):
    return render(request, "after Sign Up\dashboard.html")


def isEmail(user_input):
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    
    if re.match(email_pattern, user_input):
        return True
    else:
        return False

