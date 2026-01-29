'use client';

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { DIAGNOSTIC_QUESTIONS, TYPE_DETAILS, type DiagnosticResult as DiagnosticResultType } from '@/lib/diagnostic-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, RotateCcw } from 'lucide-react';

interface DiagnosticResultProps {
  result: DiagnosticResultType;
  onRestart: () => void;
  answers?: string[];
}

export default function DiagnosticResultComponent({
  result,
  onRestart,
  answers = [],
}: DiagnosticResultProps) {
  const resultRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownloadImage = async () => {
    if (!resultRef.current) return;
    setDownloading(true);

    try {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: '#fefdfb',
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
      });

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `出産観診断結果_${new Date().toISOString().split('T')[0]}.png`;
      link.click();
    } catch (error) {
      console.error('画像保存エラー:', error);
    } finally {
      setDownloading(false);
    }
  };

  const types = ['natural-born', 'balance', 'solid-support'] as const;
  const typeNames = {
    'natural-born': 'ナチュラルボーン',
    'balance': 'バランス',
    'solid-support': 'しっかりサポート',
  };

  const typeColors = {
    'natural-born': '#ec4899',
    'balance': '#a855f7',
    'solid-support': '#06b6d4',
  };

  const matchSymbols = {
    high: '◎',
    medium: '◯',
    low: '△',
    none: '×',
  };

  const getMatchSymbol = (matchScore: number) => {
    if (matchScore >= 80) return matchSymbols.high;
    if (matchScore >= 60) return matchSymbols.medium;
    if (matchScore >= 40) return matchSymbols.low;
    return matchSymbols.none;
  };

  const getMatchColor = (matchScore: number) => {
    if (matchScore >= 80) return 'text-blue-500';
    if (matchScore >= 60) return 'text-green-500';
    if (matchScore >= 40) return 'text-yellow-500';
    return 'text-gray-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-balance">
            考えの近さが分かる！
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            あなたの出産観と、3つのタイプとのマッチ度を確認してください
          </p>
        </div>

        {/* Saveable Result Card */}
        <div ref={resultRef} className="bg-white rounded-xl p-6 md:p-8 mb-8 shadow-lg border border-border">
          {/* Score Header */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-6">あなたのスコア</h2>

            {/* Bar Chart */}
            <div className="space-y-4">
              {types.map((type) => {
                const score = result.scores[type];
                return (
                  <div key={type} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">{typeNames[type]}</span>
                      <span className="text-lg font-bold" style={{ color: typeColors[type] }}>
                        {score}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${score}%`,
                          backgroundColor: typeColors[type],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-xs md:text-sm text-foreground">
                <span className="font-semibold">大切にしていそうなこと</span>
              </p>
              <div className="mt-3 flex gap-6 justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-pink-500">{result.values.autonomy}%</p>
                  <p className="text-xs text-muted-foreground">自主性</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-cyan-500">{result.values.safety}%</p>
                  <p className="text-xs text-muted-foreground">安全</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-500">{result.values.experience}%</p>
                  <p className="text-xs text-muted-foreground">経験</p>
                </div>
              </div>
            </div>
          </div>

          {/* Matching Matrix */}
          <div className="border-t border-border pt-8">
            <h3 className="text-sm font-bold text-foreground mb-4">各質問とのマッチ度</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-center text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 font-medium text-muted-foreground">質問</th>
                    {types.map((type) => (
                      <th key={type} className="py-2 px-2 font-medium text-muted-foreground">
                        {typeNames[type]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.itemMatches.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="text-left py-3 px-2 text-xs font-medium text-foreground">Q{index + 1}</td>
                      {types.map((type) => (
                        <td key={type} className="py-3 px-2">
                          <span className={`text-xl font-bold ${getMatchColor(item.matches[type])}`}>
                            {getMatchSymbol(item.matches[type])}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-xs text-muted-foreground space-y-1">
              <p><span className="font-semibold text-blue-500">◎</span> = 80%以上 (よく合致)</p>
              <p><span className="font-semibold text-green-500">◯</span> = 60-79% (合致)</p>
              <p><span className="font-semibold text-yellow-500">△</span> = 40-59% (部分的に合致)</p>
              <p><span className="font-semibold text-gray-400">×</span> = 39%以下 (あまり合致しない)</p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-secondary rounded-lg">
            <p className="text-xs text-foreground leading-relaxed">
              <span className="font-semibold block mb-2">大切なお知らせ</span>
              この診断は医学的な判定ではなく、あなたの出産観を知るためのツールです。
              <br />
              正解・不正解はありません。<br />
              最終的な決定はあなたと医療者との相談を通じて行ってください。
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            size="lg"
            onClick={handleDownloadImage}
            disabled={downloading}
            className="flex-1 bg-transparent"
          >
            <Download className="w-5 h-5 mr-2" />
            {downloading ? '保存中...' : '結果を画像で保存'}
          </Button>
          <Button
            size="lg"
            onClick={onRestart}
            className="flex-1"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            もう一度診断する
          </Button>
        </div>

        {/* Next Steps */}
        <div className="mt-8 p-6 bg-accent/5 rounded-lg border border-accent/20">
          <h3 className="font-semibold text-foreground mb-3">次のステップ</h3>
          <p className="text-sm text-foreground leading-relaxed mb-4">
            この診断結果を参考に、あなたの出産観に合った施設や方針を探してみてください。
          </p>
          <Button variant="outline" className="w-full bg-transparent">
            タイプ別の施設を探す
          </Button>
        </div>
      </div>
    </div>
  );
}
