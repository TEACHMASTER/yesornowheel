export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      {/* Logo SVG */}
      <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logo_gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#3ABAB4' }} />
            <stop offset="100%" style={{ stopColor: '#7F9CF5' }} />
          </linearGradient>
        </defs>
        <circle 
          cx="16" 
          cy="16" 
          r="14"
          fill="none"
          stroke="url(#logo_gradient)"
          strokeWidth="4"
          strokeDasharray="88"
          strokeDashoffset="22"
        />
      </svg>
      
      {/* Logo Text */}
      <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-500">
        YesOrNo
      </span>
    </div>
  )
}
