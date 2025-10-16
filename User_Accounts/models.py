from django.db import models

# Create your models here.
class CustomUser(models.Model):
    name = models.CharField(max_length = 50)
    email = models.EmailField(max_length = 100)
    uname = models.CharField(max_length = 100)
    password = models.CharField(max_length = 100)
  

    def __str__(self):
        return f"{self.name} - {self.email}"

    
