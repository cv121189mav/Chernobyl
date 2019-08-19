from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from .views import SendFeedbackView

urlpatterns = [
    path('', TemplateView.as_view(template_name="main_page.html"), name='ru'),
    path('en/', TemplateView.as_view(template_name="index.html"), name='en'),
    path('feedback/', SendFeedbackView.as_view(), name='leave_feedback'),
]
