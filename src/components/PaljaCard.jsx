import React from 'react';

function PaljaCard({ baziData }) {
    // AI가 보내준 년월일시 데이터를 바탕으로 파싱
    // baziData 예시: { year: "壬戌", month: "丙子", day: "甲寅", time: "己巳" }
    
    const getPillar = (title, str) => {
        if (!str || str === '알수없음') return { title, top: '?', bottom: '?' };
        return { title, top: str[0] || '?', bottom: str[1] || '?' };
    };

    // 만세력 표기는 우측부터 년-월-일-시 순서 (화면 상으로는 시-일-월-년)
    const pillars = [
        getPillar('시주', baziData?.time),
        getPillar('일주(나)', baziData?.day),
        getPillar('월주', baziData?.month),
        getPillar('년주', baziData?.year),
    ];

    // 글자에 따른 오행 색상 자동 매핑
    const getElementColor = (char) => {
        if (['甲', '乙', '寅', '卯'].includes(char)) return 'text-green-400';
        if (['丙', '丁', '巳', '午'].includes(char)) return 'text-red-400';
        if (['戊', '己', '辰', '戌', '丑', '未'].includes(char)) return 'text-yellow-600';
        if (['庚', '辛', '申', '酉'].includes(char)) return 'text-gray-300';
        if (['壬', '癸', '亥', '子'].includes(char)) return 'text-blue-400';
        return 'text-gold-light';
    };

    return (
        <div className="glass-card rounded-2xl p-6 mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
            <h3 className="text-center font-serif text-xl text-gold mb-6 pb-2">나의 사주팔자(四柱八字)</h3>
            <div className="grid grid-cols-4 gap-2 md:gap-4">
                {pillars.map((pillar, idx) => (
                    <div key={idx} className="flex flex-col items-center border-r last:border-0 border-gold/10">
                        <span className="text-xs text-gray-400 mb-3 font-serif">{pillar.title}</span>
                        <div className={`text-4xl md:text-5xl font-serif mb-2 drop-shadow-md ${getElementColor(pillar.top)}`}>{pillar.top}</div>
                        <div className={`text-4xl md:text-5xl font-serif drop-shadow-md ${getElementColor(pillar.bottom)}`}>{pillar.bottom}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PaljaCard;
