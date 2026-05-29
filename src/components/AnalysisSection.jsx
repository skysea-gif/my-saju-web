import React from 'react';

const AnalysisSection = () => {
  const sections = [
    {
      title: '타고난 성향',
      icon: '✨',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 깊은 통찰력과 직관을 가지고 있으며, 주변 사람들에게 따뜻한 에너지를 나누어주는 성향입니다.',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100',
    },
    {
      title: '재물과 직업',
      icon: '💰',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 꾸준한 노력으로 재물을 축적하는 타입이며, 사람들을 이끄는 리더십을 발휘할 수 있는 직업이 잘 맞습니다.',
      bgColor: 'bg-emerald-50',
      iconBg: 'bg-emerald-100',
    },
    {
      title: '연애와 인간관계',
      icon: '💖',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 진실되고 깊은 관계를 추구하며, 한번 인연을 맺은 사람들과는 오래도록 좋은 관계를 유지합니다.',
      bgColor: 'bg-pink-50',
      iconBg: 'bg-pink-100',
    }
  ];

  return (
    <div className="space-y-4">
      {sections.map((sec, idx) => (
        <div key={idx} className={`${sec.bgColor} rounded-2xl p-5 shadow-sm border border-white/50`}>
          <div className="flex items-center space-x-3 mb-3">
            <div className={`w-10 h-10 ${sec.iconBg} rounded-full flex items-center justify-center text-xl shadow-sm`}>
              {sec.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-800">{sec.title}</h3>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            {sec.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AnalysisSection;
