from django import forms 
from .models import Challenge 
from datetimepicker.widgets import DateTimePicker

# create a ModelForm 
class ChallengeForm(forms.ModelForm): 
    # specify the name of model to use 

    class Meta: 
        model = Challenge 
        fields = ["name","cost","img","des","discipline","type","pavilions",'deadline']
