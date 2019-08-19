from django import forms
from .models import ClientFeedback


class FeedbackForm(forms.ModelForm):
    class Meta:
        model = ClientFeedback
        fields = ('name', 'tellView', 'email', 'message')


