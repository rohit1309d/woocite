from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from multiselectfield import MultiSelectField


# Create your models here.

DISCIPLINE_CHOICES = [
    ('BE','Business Entrepreneurship'),
    ('CH','Chemistry'),
    ('CT','Computer/Info. Technology'),
    ('ED','Engineering/Design'),
    ('F','Food/Agriculture'),
    ('LS','Life Sciences'),
    ('MS','Math/Statistics'),
    ('PS','Physical Sciences'),
    ('RP','Requests for Partners'),
    ('SI','Social Innovation')
]
    
TYPE_CHOICES = [
    ('I','Ideation'),
    ('T','Theoritical'),
    ('R','RTP'),
    ('E','eRFP')
]

PAVILION_CHOICES = [
    ('EN','Enel'),
    ('CD','COVID-19'),
    ('AZ','AstraZeneca'),
    ('CC','Cleverland Clinic'),
    ('CT','CTTSO'),
    ('DP','DARPA'),
    ('EL','Elanco'),
    ('HW','HIF WASH'),
    ('LM','Lumina'),
    ('NS','NASA'),
    ('RC','Royal Society of Chemistry'),
    ('TE','Tec Edge (Air Force)'),
    ('UC','USSOCOM'),
    ('UI','US Intelligence Community'),
    ('WT','Water'),
    ('CL','Clean Tech'),
    ('DC','Developing Countries'),
    ('EV','Environment'),
    ('GH','Global Health'),
    ('PG','Public Good')
]

class Challenge(models.Model):
    name = models.CharField(max_length = 200)
    deadline = models.DateTimeField()
    cost = models.FloatField()
    img = models.ImageField(upload_to='images')
    des = models.TextField()
    status = models.BooleanField(default=False)#false is open and true is under evaluation

    discipline = MultiSelectField(
        choices=DISCIPLINE_CHOICES
    )
    type = MultiSelectField(
        choices=TYPE_CHOICES
    )
    pavilions = MultiSelectField(
        choices=PAVILION_CHOICES
    )
    
    def __str__(self):
        return self.name

    def get_des(self):
        return self.discipline

    def get_typ(self):
        return self.type

    def get_pav(self):
        return self.pavilions