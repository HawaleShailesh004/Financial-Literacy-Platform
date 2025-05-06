from django.db import models

class Blog(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    text_content = models.TextField()

    def __str__(self):
        return self.title
