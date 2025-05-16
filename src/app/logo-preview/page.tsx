import Logo from '@/components/Logo';

export default function LogoPreview() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold text-white mb-8">SocialSync Logo Preview</h1>
        
        {/* Large Logo */}
        <div className="space-y-4">
          <h2 className="text-xl text-gray-300">Large Size</h2>
          <div className="p-8 bg-gray-800/50 rounded-xl backdrop-blur-sm">
            <Logo size="lg" />
          </div>
        </div>

        {/* Medium Logo */}
        <div className="space-y-4">
          <h2 className="text-xl text-gray-300">Medium Size (Default)</h2>
          <div className="p-8 bg-gray-800/50 rounded-xl backdrop-blur-sm">
            <Logo size="md" />
          </div>
        </div>

        {/* Small Logo */}
        <div className="space-y-4">
          <h2 className="text-xl text-gray-300">Small Size</h2>
          <div className="p-8 bg-gray-800/50 rounded-xl backdrop-blur-sm">
            <Logo size="sm" />
          </div>
        </div>

        {/* Logo on Dark Background */}
        <div className="space-y-4">
          <h2 className="text-xl text-gray-300">On Dark Background</h2>
          <div className="p-8 bg-gray-950 rounded-xl">
            <Logo size="md" />
          </div>
        </div>

        {/* Logo on Gradient Background */}
        <div className="space-y-4">
          <h2 className="text-xl text-gray-300">On Gradient Background</h2>
          <div className="p-8 bg-gradient-to-br from-purple-900 to-pink-900 rounded-xl">
            <Logo size="md" />
          </div>
        </div>
      </div>
    </div>
  );
} 