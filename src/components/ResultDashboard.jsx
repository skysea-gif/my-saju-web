import React, { useState } from 'react';
import PaljaCard from './PaljaCard';

function ResultDashboard({ onReset, userData, aiResult }) {
    // 카드를 클릭했을 때 상세 내용을 보여주기 위한 상태(State)
    const [selectedDetail, setSelectedDetail] = useState(null);

    // AI가 생성해준 JSON 데이터 기반으로 카테고리 구성
    const fortuneCategories = [
        { icon: '🎭', title: '숨겨진 본성 (페르소나)', data: aiResult.persona },
        { icon: '💰', title: '재물 그릇의 크기', data: aiResult.wealth },
        { icon: '💘', title: '치명적 연애와 도화살', data: aiResult.romance },
        { icon: '⚔️', title: '나의 천적과 귀인', data: aiResult.relations },
        { icon: '🔮', title: '올해의 결정적 터닝포인트', data: aiResult.turningPoint }
    ];

    // 상세 화면일 때
    if (selectedDetail) {
        const otherCategories = fortuneCategories.filter(cat => cat.title !== selectedDetail.title);
        
        return (
            <div className="w-full max-w-3xl mx-auto animate-[fadeIn_0.3s_ease-out] pb-12">
                <button 
                    onClick={() => setSelectedDetail(null)} 
                    className="mb-6 flex items-center gap-2 text-gray-400 hover:text-gold transition font-serif group"
                >
                    <span className="text-xl group-hover:-translate-x-1 transition-transform">🔙</span> 
                    <span className="border-b border-transparent group-hover:border-gold pb-0.5">전체 운세로 돌아가기</span>
                </button>
                
                <div className="glass-card rounded-3xl p-8 md:p-12 mb-12">
                    <div className="text-6xl mb-6 text-center animate-bounce-slow">{selectedDetail.icon}</div>
                    <h2 className="text-3xl md:text-4xl font-serif text-gold-gradient font-bold text-center mb-10 pb-6 border-b border-gold/20">
                        {selectedDetail.title}
                    </h2>
                    
                    <div className="text-gray-100 font-light text-lg md:text-xl whitespace-pre-wrap leading-relaxed">
                        {selectedDetail.data?.detail || "상세 풀이를 불러오는 중 문제가 발생했습니다."}
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-xl font-serif text-gold/80 mb-6 flex items-center gap-2">
                        <span>✨</span> 다른 운세 바로가기
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {otherCategories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                    setSelectedDetail(cat);
                                }}
                                className="glass-card rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all text-center group"
                            >
                                <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                                <span className="font-serif text-sm text-gray-300 group-hover:text-gold-light transition-colors">{cat.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // 기본 대시보드 화면
    return (
        <div className="w-full max-w-3xl mx-auto animate-[fadeIn_0.5s_ease-out] pb-12">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-serif text-gold-gradient font-bold mb-2">
                    {userData.name} 님의 운명 기록서
                </h2>
                <p className="text-gold/60 text-sm mt-2 font-serif">
                    📜 {userData.calendar} {userData.birthDate} {userData.birthTime ? userData.birthTime + '시' : ''} / {userData.gender}
                </p>
            </div>

            <PaljaCard baziData={aiResult.bazi} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card rounded-2xl p-6 md:col-span-2 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="text-8xl">✨</span>
                    </div>
                    <h3 className="font-serif text-xl text-gold-light mb-3 flex items-center gap-2">
                        <span className="text-2xl">✨</span> 타고난 사주 총평
                    </h3>
                    <p className="text-gray-200 leading-relaxed font-light text-lg">
                        {aiResult.summary}
                    </p>
                </div>
                
                {fortuneCategories.map((item, index) => (
                    <div 
                        key={index} 
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            setSelectedDetail(item);
                        }}
                        className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition-all cursor-pointer hover:border-gold/60 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] group relative"
                    >
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-gold text-xs font-serif border border-gold/30 rounded-full px-3 py-1">
                            자세히 보기 🔍
                        </div>
                        <h3 className="font-serif text-lg text-gold-light mb-3 flex items-center gap-2">
                            <span className="text-2xl">{item.icon}</span> {item.title}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed font-light line-clamp-3">
                            {item.data?.summary || item.data}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-16 text-center">
                <button onClick={onReset} className="text-gray-400 hover:text-gold transition font-serif border-b border-gray-600 hover:border-gold pb-1 px-4">
                    운명의 수레바퀴 다시 돌리기 (처음으로)
                </button>
            </div>
        </div>
    );
}

export default ResultDashboard;
