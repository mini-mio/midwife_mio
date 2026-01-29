'use client';

import { useState } from 'react';
import { DIAGNOSTIC_QUESTIONS, calculateDiagnosticResult, type DiagnosticResult as DiagnosticResultType } from '@/lib/diagnostic-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import DiagnosticResult from './diagnostic-result';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function DiagnosticFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<DiagnosticResultType | null>(null);

  const question = DIAGNOSTIC_QUESTIONS[currentStep];
  const isLastStep = currentStep === DIAGNOSTIC_QUESTIONS.length - 1;
  const currentAnswer = answers[currentStep];

  const handleSelectOption = (optionId: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = optionId;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (!currentAnswer) return; // 回答がない場合は進めない

    if (isLastStep) {
      const diagnosticResult = calculateDiagnosticResult(answers);
      setResult(diagnosticResult);
      setShowResult(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResult(false);
    setResult(null);
  };

  if (showResult && result) {
    return (
      <DiagnosticResult
        result={result}
        onRestart={handleRestart}
        answers={answers}
      />
    );
  }

  const selectedOptionId = answers[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
            STEP {currentStep + 1} / {DIAGNOSTIC_QUESTIONS.length}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            出産観ナビゲーション診断
          </h1>
          <p className="text-muted-foreground text-lg">
            あなたらしい出産を見つけるために、4つの問いに答えてください
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8 w-full bg-muted rounded-full h-2">
          <div
            className="bg-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / DIAGNOSTIC_QUESTIONS.length) * 100}%` }}
          />
        </div>

        {/* Question Card */}
        <Card className="p-6 md:p-8 mb-8 shadow-lg border-0 bg-white">
          <div className="mb-8">
            <h2 className="text-xl md:text-3xl font-bold text-foreground">
              {question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                className={`w-full p-5 text-left rounded-lg border-2 transition-all duration-200 group hover:border-accent hover:bg-accent/5 ${
                  currentAnswer === option.id
                    ? 'border-accent bg-accent/10 shadow-md'
                    : 'border-border bg-card'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl flex-shrink-0 mt-0.5">
                    {'icon' in option ? option.icon : ''}
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground font-medium text-base leading-snug">
                      {option.text}
                    </p>
                  </div>
                  <div
                    className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      currentAnswer === option.id
                        ? 'border-accent bg-accent'
                        : 'border-muted-foreground group-hover:border-accent'
                    }`}
                  >
                    {currentAnswer === option.id && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3 pt-6">
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex-1 bg-transparent text-base"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              戻る
            </Button>
            <Button
              size="lg"
              onClick={handleNext}
              disabled={!currentAnswer}
              className="flex-1 text-base"
            >
              {isLastStep ? '診断する' : '次へ'}
              {!isLastStep && <ChevronRight className="w-5 h-5 ml-2" />}
            </Button>
          </div>
        </Card>

        {/* Tips */}
        <div className="text-center text-muted-foreground text-sm">
          <p>
            ※ この診断は医学的な判定ではなく、あなたの出産観を知るためのツールです。
            <br />
            決めるのはあなたです。医療者との相談を大切にしてください。
          </p>
        </div>
      </div>
    </div>
  );
}
