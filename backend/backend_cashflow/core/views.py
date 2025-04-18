from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum

# Keep your existing ViewSets here ⬇️
from rest_framework import viewsets
from .models import Tag, Transaction
from .serializers import TagSerializer, TransactionSerializer

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

# ✅ Add this below your viewsets
@api_view(['GET'])
def balance_summary(request):
    income_total = Transaction.objects.filter(type='income').aggregate(Sum('amount'))['amount__sum'] or 0
    expense_total = Transaction.objects.filter(type='expense').aggregate(Sum('amount'))['amount__sum'] or 0
    balance = income_total - expense_total

    return Response({
        'total_income': income_total,
        'total_expense': expense_total,
        'balance': balance
    })
@api_view(['GET'])
def income_total(request):
    income = Transaction.objects.filter(type='income').aggregate(Sum('amount'))['amount__sum'] or 0
    return Response({'total_income': income})

@api_view(['GET'])
def expense_total(request):
    expense = Transaction.objects.filter(type='expense').aggregate(Sum('amount'))['amount__sum'] or 0
    return Response({'total_expense': expense})
