import React from 'react';

function LoadingScreen() {
    return (
        <div className="flex flex-col items-center justify-center py-20 animate-[fadeIn_1s_ease-out]">
            <div className="w-32 h-32 mb-10 relative flex items-center justify-center">
                <div className="absolute inset-0 spinner-ring border-t-gold border-r-gold/30"></div>
                <div className="absolute inset-2 spinner-ring border-b-gold-light border-l-gold-light/30" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
                <div className="absolute inset-4 spinner-ring border-t-purple-500 border-r-purple-500/30" style={{ animationDuration: '3s' }}></div>
                <span className="text-4xl">☯️</span>
            </div>
            <h3 className="text-3xl font-serif text-gold-gradient mb-4 font-bold tracking-widest">천기(天機)를 읽는 중...</h3>
            <p className="text-gray-400 text-sm font-light animate-pulse tracking-wider">
                우주의 기운을 모아 명식을 계산하고 있습니다
            </p>
        </div>
    )
}

export default LoadingScreen;
