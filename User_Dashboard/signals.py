from django.db.models.signals import post_save
from django.dispatch import receiver
from User_Accounts.models import CustomUser as User
from User_Dashboard.models import *

@receiver(post_save, sender=User)
def create_user_progress(sender, instance, created, **kwargs):
    if created:
        # Create AchievementTracker instance
        AchievementTracker.objects.create(user=instance)
        first_module = Module.objects.order_by('id').first()
        first_chapter = None
        first_concept = None

        if first_module:
            first_chapter = first_module.chapters.order_by('id').first()
            if first_chapter:
                first_concept = first_chapter.concepts.order_by('id').first()
        
        # Create UserCurrentProgress with the first module, chapter, and concept
        UserCurrentProgress.objects.create(
            user=instance,
            current_module=first_module,
            current_chapter=first_chapter,
            current_concept=first_concept
        )

        UserProgress.objects.create(
            user = instance,
            module_no = 1,
            chapter_no = 1,
            concept_no = 1,
        )
        
        # Optionally initialize progress for all modules
        for module in Module.objects.all():
            UserModuleProgress.objects.create(user=instance, module=module)
            
            # Initialize progress for all chapters in the module
            for chapter in module.chapters.all():
                UserChapterProgress.objects.create(user=instance, chapter=chapter)
                
                # Initialize progress for all concepts in the chapter
                for concept in chapter.concepts.all():
                    UserConceptProgress.objects.create(user=instance, concept=concept)


