'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Crown, Check, Sparkles, Zap, Heart, Shield, Star, CreditCard, Smartphone, FileText, Banknote } from 'lucide-react';
import { toast } from 'sonner';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (plan: 'mensal' | 'anual') => void;
}

type PaymentMethod = 'pix' | 'card' | 'credit' | 'boleto';

export default function PaywallModal({ isOpen, onClose, onSubscribe }: PaywallModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'mensal' | 'anual' | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const benefits = [
    { icon: Sparkles, text: 'Exercícios exclusivos ilimitados', color: 'text-purple-600' },
    { icon: Zap, text: 'Análises avançadas de humor', color: 'text-yellow-600' },
    { icon: Heart, text: 'Suporte prioritário da IA 24/7', color: 'text-pink-600' },
    { icon: Shield, text: 'Meditações guiadas premium', color: 'text-blue-600' },
    { icon: Star, text: 'Conteúdo novo toda semana', color: 'text-orange-600' },
  ];

  const planPrices = {
    mensal: 29.90,
    anual: 179.90
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handlePlanSelect = (plan: 'mensal' | 'anual') => {
    setSelectedPlan(plan);
  };

  const handlePaymentSubmit = async () => {
    if (!selectedPlan) {
      toast.error('Selecione um plano primeiro');
      return;
    }

    setIsProcessing(true);

    try {
      const planPrice = planPrices[selectedPlan];
      
      setTimeout(() => {
        setIsProcessing(false);
        onSubscribe(selectedPlan);
        
        const paymentMethodNames = {
          pix: 'PIX',
          card: 'Cartão de Débito',
          credit: 'Cartão de Crédito',
          boleto: 'Boleto Bancário'
        };

        toast.success(
          `✅ Assinatura ${selectedPlan === 'mensal' ? 'Mensal' : 'Anual'} ativada!\n\n💰 Valor: ${formatCurrency(planPrice)}\n💳 Método: ${paymentMethodNames[paymentMethod]}\n\nBem-vindo ao Premium! 🎉`,
          { duration: 6000 }
        );
      }, 2000);
    } catch (error) {
      setIsProcessing(false);
      toast.error('Erro ao processar pagamento. Tente novamente.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <Card className="w-full max-w-4xl my-8 bg-gradient-to-br from-white via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 shadow-2xl border-2 border-purple-200 dark:border-purple-800">
        <div className="relative">
          {/* Close Button */}
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 hover:bg-white/50 dark:hover:bg-gray-800/50"
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Header */}
          <div className="p-8 sm:p-12 text-center space-y-4 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
            <div className="relative z-10">
              <Crown className="w-20 h-20 mx-auto mb-4 animate-pulse drop-shadow-2xl" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                Desbloqueie o Premium
              </h2>
              <p className="text-lg text-purple-100">
                Transforme sua jornada de bem-estar mental
              </p>
              <Badge className="mt-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                🎉 Oferta Especial - Primeiros Usuários
              </Badge>
            </div>
          </div>

          {/* Benefits */}
          <div className="p-8 sm:p-12 space-y-6 max-h-[60vh] overflow-y-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                O que você ganha com Premium
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tudo que você precisa para cuidar da sua saúde mental
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                    <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">
                      {benefit.text}
                    </p>
                  </div>
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                </div>
              ))}
            </div>

            {/* Pricing Cards */}
            <div className="grid sm:grid-cols-2 gap-6 mt-8">
              {/* Plano Mensal */}
              <Card 
                className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedPlan === 'mensal' 
                    ? 'bg-purple-50 dark:bg-purple-900/30 border-4 border-purple-600 shadow-2xl' 
                    : 'bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800 hover:shadow-2xl'
                }`}
                onClick={() => handlePlanSelect('mensal')}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                        Mensal
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Flexibilidade total
                      </p>
                    </div>
                    {selectedPlan === 'mensal' && (
                      <Check className="w-8 h-8 text-purple-600" />
                    )}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                      {formatCurrency(planPrices.mensal)}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">/mês</span>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-green-600" />
                      Todos os benefícios Premium
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-green-600" />
                      Cancele quando quiser
                    </li>
                  </ul>
                </div>
              </Card>

              {/* Plano Anual - Destaque */}
              <Card 
                className={`p-6 cursor-pointer relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                  selectedPlan === 'anual'
                    ? 'bg-gradient-to-br from-purple-700 to-pink-700 text-white border-4 border-yellow-400 shadow-2xl'
                    : 'bg-gradient-to-br from-purple-600 to-pink-600 text-white border-0 shadow-2xl'
                }`}
                onClick={() => handlePlanSelect('anual')}
              >
                <Badge className="absolute top-4 right-4 bg-yellow-400 text-gray-900 border-0">
                  🔥 Mais Popular
                </Badge>
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold">
                        Anual
                      </h4>
                      <p className="text-sm text-purple-100">
                        Economize 40%
                      </p>
                    </div>
                    {selectedPlan === 'anual' && (
                      <Check className="w-8 h-8" />
                    )}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">
                      {formatCurrency(planPrices.anual)}
                    </span>
                    <span className="text-purple-100">/ano</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <p className="text-sm font-semibold">
                      Apenas R$ 14,99/mês
                    </p>
                    <p className="text-xs text-purple-100">
                      Você economiza R$ 178,90 por ano
                    </p>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4" />
                      Todos os benefícios Premium
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4" />
                      Conteúdo exclusivo anual
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4" />
                      Suporte prioritário VIP
                    </li>
                  </ul>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              </Card>
            </div>

            {/* Payment Methods */}
            {selectedPlan && (
              <Card className="p-6 bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                  Escolha a forma de pagamento
                </h4>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <Button
                      type="button"
                      variant={paymentMethod === 'pix' ? 'default' : 'outline'}
                      className={`flex flex-col items-center gap-2 h-auto py-4 ${
                        paymentMethod === 'pix' 
                          ? 'bg-purple-600 hover:bg-purple-700' 
                          : ''
                      }`}
                      onClick={() => setPaymentMethod('pix')}
                    >
                      <Smartphone className="w-6 h-6" />
                      <span className="text-xs font-medium">PIX</span>
                    </Button>
                    <Button
                      type="button"
                      variant={paymentMethod === 'card' ? 'default' : 'outline'}
                      className={`flex flex-col items-center gap-2 h-auto py-4 ${
                        paymentMethod === 'card' 
                          ? 'bg-purple-600 hover:bg-purple-700' 
                          : ''
                      }`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <CreditCard className="w-6 h-6" />
                      <span className="text-xs font-medium">Débito</span>
                    </Button>
                    <Button
                      type="button"
                      variant={paymentMethod === 'credit' ? 'default' : 'outline'}
                      className={`flex flex-col items-center gap-2 h-auto py-4 ${
                        paymentMethod === 'credit' 
                          ? 'bg-purple-600 hover:bg-purple-700' 
                          : ''
                      }`}
                      onClick={() => setPaymentMethod('credit')}
                    >
                      <Banknote className="w-6 h-6" />
                      <span className="text-xs font-medium">Crédito</span>
                    </Button>
                    <Button
                      type="button"
                      variant={paymentMethod === 'boleto' ? 'default' : 'outline'}
                      className={`flex flex-col items-center gap-2 h-auto py-4 ${
                        paymentMethod === 'boleto' 
                          ? 'bg-purple-600 hover:bg-purple-700' 
                          : ''
                      }`}
                      onClick={() => setPaymentMethod('boleto')}
                    >
                      <FileText className="w-6 h-6" />
                      <span className="text-xs font-medium">Boleto</span>
                    </Button>
                  </div>

                  {/* Payment Info */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                      {paymentMethod === 'pix' && '⚡ Pagamento instantâneo via PIX'}
                      {paymentMethod === 'card' && '💳 Pagamento com cartão de débito'}
                      {paymentMethod === 'credit' && '💳 Parcelamento disponível no cartão de crédito'}
                      {paymentMethod === 'boleto' && '📄 Boleto bancário com vencimento em 3 dias'}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                      {paymentMethod === 'pix' && 'Aprovação imediata após o pagamento'}
                      {paymentMethod === 'card' && 'Débito em conta corrente ou poupança'}
                      {paymentMethod === 'credit' && 'Parcele em até 12x sem juros'}
                      {paymentMethod === 'boleto' && 'Compensação em até 2 dias úteis'}
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    onClick={handlePaymentSubmit}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg text-lg py-6 mt-4"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <Crown className="w-5 h-5 mr-2" />
                        Assinar Premium {selectedPlan === 'mensal' ? 'Mensal' : 'Anual'}
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            )}

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Pagamento 100% seguro</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Star className="w-4 h-4 text-yellow-600" />
                <span>Garantia de 7 dias</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Heart className="w-4 h-4 text-pink-600" />
                <span>+10.000 usuários satisfeitos</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
