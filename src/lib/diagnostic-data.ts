export type DiagnosticType = 'natural-born' | 'balance' | 'solid-support';

export interface DiagnosticResult {
  scores: {
    'natural-born': number; // マッチング率
    'balance': number;
    'solid-support': number;
  };
  values: {
    autonomy: number; // 合計100%に正規化
    safety: number;
    experience: number;
  };
  itemMatches: Array<{
    questionIndex: number;
    userChoice: string;
    matches: Record<DiagnosticType, number>; // 各タイプとのマッチ度 0-100%
  }>;
}

export interface DiagnosticOption {
  id: string;
  text: string;
  icon: string;
  typeScores: Record<DiagnosticType, number>;
}

export interface DiagnosticQuestion {
  step: number;
  question: string;
  options: DiagnosticOption[];
}

export interface TypeDetail {
  id: DiagnosticType;
  name: string;
  subtitle: string;
  description: string;
  values: string[];
  characteristics: string[];
  environment: {
    title: string;
    items: string[];
  };
  medical: {
    title: string;
    items: string[];
  };
  customization: string;
  suitability: string;
}

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    step: 1,
    question: '安心できる出産環境は？',
    options: [
      { id: 'a', text: '自分のペースで自然に', icon: '🌿', typeScores: { 'natural-born': 80, 'balance': 40, 'solid-support': 20 } },
      { id: 'b', text: 'スタッフと一緒に相談しながら', icon: '🤝', typeScores: { 'natural-born': 40, 'balance': 85, 'solid-support': 45 } },
      { id: 'c', text: '医療設備と専門家にお任せ', icon: '🏥', typeScores: { 'natural-born': 20, 'balance': 45, 'solid-support': 90 } },
    ],
  },
  {
    step: 2,
    question: '出産の主導権は？',
    options: [
      { id: 'a', text: '自分で判断して進めたい', icon: '👤', typeScores: { 'natural-born': 85, 'balance': 35, 'solid-support': 15 } },
      { id: 'b', text: '相談しながら一緒に決めたい', icon: '🤝', typeScores: { 'natural-born': 35, 'balance': 88, 'solid-support': 40 } },
      { id: 'c', text: 'プロの判断に任せたい', icon: '👨‍⚕️', typeScores: { 'natural-born': 15, 'balance': 40, 'solid-support': 92 } },
    ],
  },
  {
    step: 3,
    question: '出産はどんな体験でありたい？',
    options: [
      { id: 'a', text: '体験を大事にしたい', icon: '💫', typeScores: { 'natural-born': 90, 'balance': 50, 'solid-support': 25 } },
      { id: 'b', text: '体験と安全の両立', icon: '⚖️', typeScores: { 'natural-born': 50, 'balance': 92, 'solid-support': 55 } },
      { id: 'c', text: '安全が一番大事', icon: '🛡️', typeScores: { 'natural-born': 20, 'balance': 50, 'solid-support': 95 } },
    ],
  },
  {
    step: 4,
    question: '出産で一番不安なことは？',
    options: [
      { id: 'a', text: '医療の介入が多すぎること', icon: '⚠️', typeScores: { 'natural-born': 85, 'balance': 40, 'solid-support': 15 } },
      { id: 'b', text: 'もしもの時の対応', icon: '🚨', typeScores: { 'natural-born': 40, 'balance': 85, 'solid-support': 50 } },
      { id: 'c', text: 'リスクと母子の安全', icon: '🛡️', typeScores: { 'natural-born': 15, 'balance': 45, 'solid-support': 90 } },
    ],
  },
];

export const TYPE_DETAILS: Record<DiagnosticType, TypeDetail> = {
  'natural-born': {
    id: 'natural-born',
    name: 'ナチュラルボーン',
    subtitle: '出産の主導権を自分に置きたい',
    description: 'あなたは自然なペースでの出産を大切にし、自分のからだの声に耳を傾けながら、主体的に出産を進めたいと考えているようです。医療を信頼しながらも、できるだけ自然な経過を望んでいます。',
    values: [
      '自主性と自分のペースの尊重',
      '自然な出産体験',
      '選択肢と自由度',
      'からだとの対話',
    ],
    characteristics: [
      '自分のからだの声を信頼している',
      'リラックスできる環境を大切にする',
      '周囲の意見より自分の直感を重視する',
      '出産を人生の一つの体験として捉える',
    ],
    environment: {
      title: '適した出産環境',
      items: [
        '助産院での出産（助産師による継続的なケア）',
        '自宅での出産（アウトハイム）',
        '一般産院（医師と助産師が連携）',
      ],
    },
    medical: {
      title: '医療体制',
      items: [
        '医師は必要時に連携（常駐ではない）',
        '助産師が中心的なサポート',
        '自然な流れを尊重',
        '医学的な介入は必要時のみ',
      ],
    },
    customization: 'カスタマイズ性が高く、出産環境・立ち会い・体勢など自分たちで選択できます',
    suitability: '低リスク妊娠で、自然な経過が見込まれる方に向いています',
  },
  'balance': {
    id: 'balance',
    name: 'バランス',
    subtitle: '自然＋医療の両立',
    description: 'あなたは出産の自然な流れを大切にしながらも、医療の安心感を求めるバランス感覚を持っているようです。医療者と一緒に相談しながら、自分たちらしい出産を創っていきたいというお考えですね。',
    values: [
      '自然さと安心の両立',
      '医療者との信頼関係',
      '柔軟な対応',
      'パートナーシップ',
    ],
    characteristics: [
      'バランスの取れた思考を持つ',
      '医療を信頼しつつ、自分の要望も大切にする',
      '状況に応じて柔軟に対応できる',
      '医療者とのコミュニケーションを重視する',
    ],
    environment: {
      title: '適した出産環境',
      items: [
        '一般産院（最も多くの妊婦が選択）',
        'LDRルーム完備の産院',
        '大学病院の周産期管理外来併設産院',
      ],
    },
    medical: {
      title: '医療体制',
      items: [
        '医師と助産師が両立',
        '希望と安全性のバランスを調整',
        '必要な監視と自然な経過の両立',
        '柔軟な出産計画の作成',
      ],
    },
    customization: 'ある程度のカスタマイズが可能で、病院の方針の中で希望を調整します',
    suitability: '標準的なリスク妊娠で、自然さと安心の両方を求める方に向いています',
  },
  'solid-support': {
    id: 'solid-support',
    name: 'しっかりサポート',
    subtitle: '医療体制を安心の軸にしたい',
    description: 'あなたは何より母子の安全を最優先に考えており、医療体制による確実なサポートを求めているようです。医療の専門的判断を信頼し、その中で最善の出産を実現したいというお考えですね。',
    values: [
      '母子の安全',
      '専門的な医療体制',
      '緊急対応の準備',
      '信頼できる医療機関',
    ],
    characteristics: [
      '安全を最優先に考える',
      '医療専門家を信頼している',
      'リスク管理を重視する',
      '複雑な妊娠・出産にも対応できる体制を求める',
    ],
    environment: {
      title: '適した出産環境',
      items: [
        '大学病院・総合病院',
        '周産期母子医療センター',
        'ハイリスク妊娠対応施設',
      ],
    },
    medical: {
      title: '医療体制',
      items: [
        '医師が中心的な管理',
        '最新の医療設備完備',
        '緊急時の対応体制が整備',
        '新生児集中治療室（NICU）完備',
      ],
    },
    customization: 'カスタマイズ性は低く、安全管理を最優先とした医療方針に従います',
    suitability: 'ハイリスク妊娠や複雑な状況の方、または安全を最重視される方に向いています',
  },
};

export function calculateDiagnosticResult(
  answers: string[]
): DiagnosticResult {
  const types: DiagnosticType[] = ['natural-born', 'balance', 'solid-support'];
  const typeScores: Record<DiagnosticType, number> = {
    'natural-born': 0,
    'balance': 0,
    'solid-support': 0,
  };

  const itemMatches: Array<{
    questionIndex: number;
    userChoice: string;
    matches: Record<DiagnosticType, number>;
  }> = [];

  // Calculate matching scores for each type
  answers.forEach((answerId, stepIndex) => {
    const question = DIAGNOSTIC_QUESTIONS[stepIndex];
    const option = question.options.find((opt) => opt.id === answerId);
    
    if (option && 'typeScores' in option) {
      const typeScoresData = option.typeScores as Record<DiagnosticType, number>;
      types.forEach((type) => {
        typeScores[type] += typeScoresData[type];
      });

      itemMatches.push({
        questionIndex: stepIndex,
        userChoice: answerId,
        matches: { ...typeScoresData },
      });
    }
  });

  // Normalize to 0-100%
  const totalPossible = 4 * 100; // 4 questions, max 100 per type
  const normalizedScores: Record<DiagnosticType, number> = {
    'natural-born': Math.round((typeScores['natural-born'] / totalPossible) * 100),
    'balance': Math.round((typeScores['balance'] / totalPossible) * 100),
    'solid-support': Math.round((typeScores['solid-support'] / totalPossible) * 100),
  };

  // Calculate normalized values (100% total) based on type scores
  const total = Object.values(normalizedScores).reduce((a, b) => a + b, 0);
  const values = {
    autonomy: Math.round((normalizedScores['natural-born'] / total) * 100),
    safety: Math.round((normalizedScores['solid-support'] / total) * 100),
    experience: Math.round((normalizedScores['balance'] / total) * 100),
  };

  // Adjust for rounding to ensure exactly 100%
  const sum = values.autonomy + values.safety + values.experience;
  if (sum !== 100) {
    const diff = 100 - sum;
    values.autonomy += diff;
  }

  return {
    scores: normalizedScores,
    values,
    itemMatches,
  };
}
