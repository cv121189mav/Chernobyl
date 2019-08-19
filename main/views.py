from django.shortcuts import redirect, HttpResponse
from django.views import View
from .forms import FeedbackForm


class SendFeedbackView(View):

    def post(self, request):
        print(request.META['HTTP_REFERER'])
        if request.method == 'POST':
            feedback = FeedbackForm(request.POST)
            if feedback.is_valid():
                feedback.save()
                return redirect('/')
            else:
                return HttpResponse('<h1>заповніть будь ласка всі поля <a href="/">повернутись на головну</a></h>')
        else:
            return redirect('/')
