

from django.urls import path, include


from rest_framework.routers import DefaultRouter
from .views import TagViewSet, TransactionViewSet, balance_summary, income_total, expense_total


router = DefaultRouter()
router.register(r'tags', TagViewSet, basename='tag')
router.register(r'transactions', TransactionViewSet, basename='transaction')

urlpatterns = [
    path('', include(router.urls)),
     path('summary/', balance_summary, name='balance-summary'),
      path('income-total/', income_total, name='income-total'),
    path('expense-total/', expense_total, name='expense-total'),
    

]
