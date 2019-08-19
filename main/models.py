from django.db import models

# Create your models here.


class ClientFeedback(models.Model):
    name = models.CharField(max_length=55)
    tellView = models.CharField(max_length=55)
    email = models.EmailField(max_length=55, blank=True)
    message = models.TextField(blank=True)

    def __str__(self):
        return self.name

