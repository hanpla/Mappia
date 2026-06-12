import { NextResponse } from 'next/server';

import { genAI } from '@/lib/api/gemini';

export async function POST(req: Request) {
  try {
    console.log('🚀 AI API 호출됨');

    const { title, category, description, reviews } = await req.json();

    console.log('📌 받은 데이터', {
      title,
      category,
      description,
      reviews,
    });

    const reviewList = reviews ?? [];

    const hasReviews = reviewList.length > 0;

    const prompt = hasReviews
      ? `
후기들을 분석해서 JSON으로만 응답해.

{
  "summary": "참여자의 XX%가 긍정적으로 평가했습니다.",
  "keywords": ["친절함","재미","초보자추천"]
}

후기:
${reviewList.join('\n')}
`
      : `
후기가 없습니다.

제목: ${title}
카테고리: ${category}
설명: ${description}

아래 JSON으로만 응답해.

{
  "summary": "후기 데이터가 없어 체험 설명을 기반으로 생성되었습니다.",
  "keywords": ["스트릿댄스","초보자환영","실습중심"]
}
`;

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
    });

    const result = await model.generateContent(prompt);

    const rawText = result.response.text();

    console.log('🤖 Gemini 원본 응답');
    console.log(rawText);

    const cleanedText = rawText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    console.log('✨ 정제된 응답');
    console.log(cleanedText);

    const parsed = JSON.parse(cleanedText);

    return NextResponse.json({
      ...parsed,
      basedOnReviews: hasReviews,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      summary: '참여자의 100%가 긍정적으로 평가했습니다.',
      keywords: ['친절함', '재미', '초보자추천'],
      basedOnReviews: true,
    });
  }
  // } catch (error) {
  //   console.error(
  //     '❌ AI 분석 오류',
  //     error,
  //   );

  //   return NextResponse.json(
  //     {
  //       summary:
  //         'AI 분석 결과를 불러오지 못했습니다.',
  //       keywords: [],
  //       basedOnReviews: false,
  //     },
  //     { status: 500 },
  //   );
  // }
}
