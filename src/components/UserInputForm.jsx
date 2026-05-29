import React, { useState } from 'react';

function UserInputForm({ onSubmit, externalError }) {
    const [apiKey, setApiKey] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('남');
    const [calendar, setCalendar] = useState('양력');
    const [birthDate, setBirthDate] = useState('2000-08-24');
    const [birthTime, setBirthTime] = useState('');
    const [localError, setLocalError] = useState('');

    const handleSubmit = () => {
        if (!apiKey) {
            alert("안전한 사주 풀이를 위해 Gemini API 키를 먼저 입력해 주세요.");
            setLocalError("Gemini API 키가 필요합니다.");
            return;
        }
        if (!name || !birthDate) {
            setLocalError("이름과 생년월일은 우주의 기운을 읽기 위해 필수입니다.");
            return;
        }
        setLocalError("");
        onSubmit({ apiKey, name, gender, calendar, birthDate, birthTime });
    };

    return (
        <div className="glass-card rounded-2xl p-8 max-w-md w-full mx-auto animate-[fadeIn_1s_ease-out]">
            <h2 className="text-3xl font-serif text-center mb-8 text-gold-gradient font-bold tracking-widest">
                사주명식 입력
            </h2>
            
            {(localError || externalError) && (
                <div className="mb-6 p-3 rounded-lg bg-red-900/30 border border-red-500/50 text-red-200 text-sm text-center">
                    {localError || externalError}
                </div>
            )}
            
            <div className="space-y-6">
                <div>
                    <label className="block text-sm text-gray-400 mb-1 font-serif">Gemini API 키</label>
                    <input 
                        type="password" 
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="AIzaSy..." 
                        className="input-mystic w-full py-2 text-lg" 
                    />
                    <p className="text-xs text-gold/60 mt-2 font-serif">
                        ※ Google AI Studio에서 무료로 발급받은 Gemini API 키가 필요합니다.
                    </p>
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1 font-serif">이름</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="조기범" 
                        className="input-mystic w-full py-2 text-lg" 
                    />
                </div>

                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label className="block text-sm text-gray-400 mb-1 font-serif">성별</label>
                        <div className="flex rounded-lg border border-gold/30 overflow-hidden">
                            <button 
                                onClick={() => setGender('남')}
                                className={`flex-1 py-2 font-medium transition ${gender === '남' ? 'bg-gold/20 text-gold-light' : 'text-gray-400 hover:text-gold'}`}>
                                남
                            </button>
                            <button 
                                onClick={() => setGender('여')}
                                className={`flex-1 py-2 font-medium transition ${gender === '여' ? 'bg-gold/20 text-gold-light' : 'text-gray-400 hover:text-gold'}`}>
                                여
                            </button>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <label className="block text-sm text-gray-400 mb-1 font-serif">달력</label>
                        <div className="flex rounded-lg border border-gold/30 overflow-hidden">
                            <button 
                                onClick={() => setCalendar('양력')}
                                className={`flex-1 py-2 font-medium transition ${calendar === '양력' ? 'bg-gold/20 text-gold-light' : 'text-gray-400 hover:text-gold'}`}>
                                양력
                            </button>
                            <button 
                                onClick={() => setCalendar('음력')}
                                className={`flex-1 py-2 font-medium transition ${calendar === '음력' ? 'bg-gold/20 text-gold-light' : 'text-gray-400 hover:text-gold'}`}>
                                음력
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1 font-serif">생년월일</label>
                    <input 
                        type="date" 
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="input-mystic w-full py-2 text-lg [color-scheme:dark]" 
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1 font-serif">태어난 시간 (선택)</label>
                    <select 
                        value={birthTime}
                        onChange={(e) => setBirthTime(e.target.value)}
                        className="input-mystic w-full py-2 text-lg [&>option]:bg-night"
                    >
                        <option value="">모름</option>
                        <option value="자">자시 (23:30 ~ 01:29)</option>
                        <option value="축">축시 (01:30 ~ 03:29)</option>
                        <option value="인">인시 (03:30 ~ 05:29)</option>
                        <option value="묘">묘시 (05:30 ~ 07:29)</option>
                        <option value="진">진시 (07:30 ~ 09:29)</option>
                        <option value="사">사시 (09:30 ~ 11:29)</option>
                        <option value="오">오시 (11:30 ~ 13:29)</option>
                        <option value="미">미시 (13:30 ~ 15:29)</option>
                        <option value="신">신시 (15:30 ~ 17:29)</option>
                        <option value="유">유시 (17:30 ~ 19:29)</option>
                        <option value="술">술시 (19:30 ~ 21:29)</option>
                        <option value="해">해시 (21:30 ~ 23:29)</option>
                    </select>
                </div>

                <button 
                    onClick={handleSubmit}
                    className="btn-glow w-full mt-8 py-4 rounded-lg font-serif text-lg tracking-widest mt-4"
                >
                    천명(天命) 확인하기
                </button>
            </div>
        </div>
    );
}

export default UserInputForm;
