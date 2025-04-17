from django.db import models

# Create your models here.
class Tag(models.Model):
    name = models.CharField(max_length=100)
    color =  models.CharField(max_length=20)

    def __str__(self):
        return self.name


class Transaction(models.Model):
    TRANSACTION_TYPES = (
        ('income', 'Income'),
        ('expense', 'Expense'),
    )

    type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    description = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now_add=True)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE, related_name='transactions')

    def __str__(self):
        return f"{self.type} - {self.amount}"
    
    