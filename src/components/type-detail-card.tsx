'use client';

import { useState } from 'react';
import { type TypeDetail } from '@/lib/diagnostic-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TypeDetailCardProps {
  detail: TypeDetail;
  isSelected?: boolean;
}

const typeIcons: Record<string, string> = {
  'natural-born': '🌿',
  'balance': '⚖️',
  'solid-support': '🏥',
};

const typeColors: Record<string, { bg: string; border: string; badge: string }> = {
  'natural-born': {
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    badge: 'bg-rose-100 text-rose-700',
  },
  'balance': {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    badge: 'bg-purple-100 text-purple-700',
  },
  'solid-support': {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
  },
};

export default function TypeDetailCard({
  detail,
  isSelected = false,
}: TypeDetailCardProps) {
  const [isExpanded, setIsExpanded] = useState(isSelected);
  const colors = typeColors[detail.id];

  return (
    <Card
      className={`overflow-hidden border-2 transition-all ${
        isSelected
          ? `${colors.bg} ${colors.border} shadow-lg`
          : `border-border hover:border-accent/50`
      }`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full text-left p-6 ${colors.bg}`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">{typeIcons[detail.id]}</div>
          {isSelected && (
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
              あなたの診断結果
            </div>
          )}
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-1">
          {detail.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {detail.subtitle}
        </p>
        <div className="flex gap-2">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          )}
          <span className="text-sm text-muted-foreground">
            {isExpanded ? '詳細を隠す' : '詳細を見る'}
          </span>
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-border/50 px-6 py-6 space-y-6">
          {/* Description */}
          <div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {detail.description}
            </p>
          </div>

          {/* Characteristics */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">
              こんな特徴があります
            </h4>
            <ul className="space-y-2">
              {detail.characteristics.map((characteristic, index) => (
                <li key={index} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="text-accent flex-shrink-0">✓</span>
                  <span>{characteristic}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Environment */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">
              {detail.environment.title}
            </h4>
            <div className="space-y-2">
              {detail.environment.items.map((item, index) => (
                <div
                  key={index}
                  className="text-sm text-foreground bg-muted/50 rounded px-3 py-2"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Medical */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">
              {detail.medical.title}
            </h4>
            <div className="space-y-2">
              {detail.medical.items.map((item, index) => (
                <div
                  key={index}
                  className="text-sm text-foreground bg-muted/50 rounded px-3 py-2"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Customization */}
          <div className="bg-secondary/50 rounded-lg p-4 border border-border">
            <p className="text-sm text-foreground mb-2">
              <strong>カスタマイズ性：</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              {detail.customization}
            </p>
          </div>

          {/* Suitability */}
          <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
            <p className="text-sm text-accent mb-2 font-semibold">
              このタイプに向いている方
            </p>
            <p className="text-sm text-foreground">
              {detail.suitability}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
