from django.shortcuts import render,redirect
from django.core.paginator import Paginator
from .models import Challenge
from .forms import ChallengeForm
from django.contrib import messages

# Create your views here.

def index(request):
    chlg = Challenge.objects.all()
    paginator = Paginator(chlg,10 ) 
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request,'index.html',{'page_obj': page_obj})

def home(request): 
    context ={} 
    context['form']= ChallengeForm()
    if request.method == 'POST':
        form = ChallengeForm(request.POST, request.FILES)
        if form.is_valid():
            input = form.save()
            input.user = request.user
            input.save()
            form.clean()
            messages.info(request, "Challenge added.")
            return render(request, "home.html", context,)        
    return render(request, "home.html", context)