from django.db import models
from User_Accounts.models import CustomUser as User

# Create your models here.
class Module(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.title

class Chapter(models.Model):
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='chapters')
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.title

class KeyConcept(models.Model):
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE, related_name='concepts')
    title = models.CharField(max_length=255, unique=True)
    description = models.TextField()

    def __str__(self):
        return self.title

class ConceptDetail(models.Model):
    concept = models.ForeignKey(KeyConcept, on_delete=models.CASCADE, related_name='details')
    fact = models.TextField()
    definition_explanation = models.TextField()
    real_world_example = models.TextField()

    def __str__(self):
        return f"Details for {self.concept.title}"

class Quiz(models.Model):
    concept_detail = models.OneToOneField(KeyConcept, on_delete=models.CASCADE, related_name='quiz')
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    text = models.TextField()
    option_a = models.CharField(max_length=255)
    option_b = models.CharField(max_length=255)
    option_c = models.CharField(max_length=255)
    option_d = models.CharField(max_length=255)
    correct_answer = models.CharField(max_length=1, choices=[('A', 'Option A'), ('B', 'Option B'), ('C', 'Option C'), ('D', 'Option D')])

    def __str__(self):
        return self.text[:50]
    
class UserModuleProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)

    def __str__(self):
        status = "Completed" if self.completed else "In Progress"
        return f"{self.user.uname}'s Progress in {self.module.title}: {status}"

    class Meta:
        unique_together = ('user', 'module')



class UserChapterProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)

    def __str__(self):
        status = "Completed" if self.completed else "Incomplete"
        return f"{self.user.uname}'s Progress in {self.chapter.title}: {status}"

    class Meta:
        unique_together = ('user', 'chapter')

class UserConceptProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    concept = models.ForeignKey(KeyConcept, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)

    def __str__(self):
        status = "Completed" if self.completed else "Incomplete"
        return f"{self.user.uname}'s Progress in {self.concept.title}: {status}"

    class Meta:
        unique_together = ('user', 'concept')

class UserCurrentProgress(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='current_progress')
    current_module = models.ForeignKey(Module, on_delete=models.SET_NULL, null=True, blank=True, related_name='users_current_module')
    current_chapter = models.ForeignKey(Chapter, on_delete=models.SET_NULL, null=True, blank=True, related_name='users_current_chapter')
    current_concept = models.ForeignKey(KeyConcept, on_delete=models.SET_NULL, null=True, blank=True, related_name='users_current_concept')
    current_quiz = models.ForeignKey(Quiz, on_delete=models.SET_NULL, null=True, blank=True, related_name='users_current_quiz')
    current_quiz_no = models.IntegerField(default=1)

    def __str__(self):
        return f"Current Progress for {self.user.uname}"

class AchievementTracker(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='achievement_tracker')
    points = models.IntegerField(default=0, help_text="The total points the user has earned.")
    coins = models.IntegerField(default=0, help_text="The total coins the user has earned.")
    level = models.IntegerField(default=1, help_text="The user's current level.")
    experience = models.IntegerField(default=0, help_text="The user's total experience points.")
    badge = models.CharField(max_length=100, blank=True, null=True, help_text="The highest badge the user has earned.", default="Beginner")

    def __str__(self):
        return f"Achievement Tracker for {self.user.uname}"

    def add_points(self, amount):
        """Add points to the user's total."""
        self.points += amount
        self.save()

    def add_coins(self, amount):
        """Add coins to the user's total."""
        self.coins += amount
        self.save()

    def add_experience(self, amount):
        """Add experience to the user, potentially increasing the user's level."""
        self.experience += amount
        self.check_level_up()
        self.save()

    def check_level_up(self):
        """Check if the user has gained enough experience to level up."""
        # Assuming 100 experience points are required to level up
        experience_per_level = 100
        while self.experience >= (self.level * experience_per_level):
            self.level += 1
            self.experience -= (self.level * experience_per_level)
            # Optionally, call a method to assign a new badge based on the level
            self.assign_badge_based_on_level()

    def assign_badge_based_on_level(self):
        """Assign a badge to the user based on their level."""
        # Example badge assignment logic
        if self.level >= 10:
            self.badge = "Master"
        elif self.level >= 5:
            self.badge = "Expert"
        elif self.level >= 3:
            self.badge = "Intermediate"
        else:
            self.badge = "Beginner"
        self.save()

    def reset_tracker(self):
        """Reset the achievement tracker for the user."""
        self.points = 0
        self.coins = 0
        self.level = 1
        self.experience = 0
        self.badge = None
        self.save()

class UserProgress(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_progress')
    module_no = models.IntegerField(choices=[(i, f"Module {i}") for i in range(1, 9)])
    chapter_no = models.IntegerField(choices=[(i, f"Chapter {i}") for i in range(1, 6)])
    concept_no = models.IntegerField(choices=[(1, "Concept 1"), (3, "Concept 3")])

    def __str__(self):
        return f"{self.user.uname} - Module {self.module_no}, Chapter {self.chapter_no}, Concept {self.concept_no}"