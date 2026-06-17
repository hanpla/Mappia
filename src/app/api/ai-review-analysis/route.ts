import { NextResponse } from 'next/server';

import { type Schema, SchemaType } from '@google/generative-ai';

import { genAI } from '@/lib/api/gemini';

export async function POST(req: Request) {
  try {
    console.log('🚀 AI API 호출됨');
    const { title, category, description, reviews } = await req.json();
    if (process.env.NODE_ENV === 'development') {
      console.log(
        '🚧 [개발 모드] 가짜 데이터를 반환하여 Gemini 사용량을 아낍니다.',
      );
      return NextResponse.json({
        summary:
          '[개발용 가짜 데이터] 이 체험은 아주 재미있고 리뷰어들의 만족도가 높습니다. 테스트 중입니다.',
        keywords: ['로컬테스트', '가짜데이터', '비용절약'],
        basedOnReviews: reviews?.length > 0,
      });
    }

    const reviewList = reviews ?? [];
    const hasReviews = reviewList.length > 0;

    const prompt = hasReviews
      ? `다음은 사용자들이 작성한 실제 체험 후기들입니다. 이 후기들을 바탕으로 체험의 특징을 잘 나타내는 1~2줄 요약문과 핵심 키워드 3개를 뽑아주세요.\n\n후기 리스트:\n${reviewList.join('\n')}`
      : `현재 작성된 후기가 없습니다. 다음 체험 정보를 바탕으로, 이 체험이 어떤 특징을 가졌는지 소개하는 1~2줄 요약문과 예상 핵심 키워드 3개를 뽑아주세요.\n\n제목: ${title}\n카테고리: ${category}\n설명: ${description}`;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const responseSchema: Schema = {
      type: SchemaType.OBJECT,
      properties: {
        summary: {
          type: SchemaType.STRING,
          description: hasReviews
            ? '후기 내용을 바탕으로 한 1-2줄 요약문'
            : '체험 설명을 기반으로 작성된 1-2줄 안내 요약문',
        },
        keywords: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING },
          description: '체험을 표현하는 대표 키워드 (최대 3개)',
        },
      },
      required: ['summary', 'keywords'],
    };

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema,
      },
    });

    const rawText = result.response.text();
    const parsed = JSON.parse(rawText);

    return NextResponse.json({ ...parsed, basedOnReviews: hasReviews });
  } catch (error) {
    console.error('❌ AI 분석 오류:', error);
    return NextResponse.json(
      {
        summary:
          '현재 AI 분석 결과를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
        keywords: ['체험', '리뷰'],
        basedOnReviews: false,
      },
      { status: 500 },
    );
  }
}
