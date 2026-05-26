{ pkgs ? import <nixpkgs> { } }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs
    nodePackages.typescript
    nodePackages.typescript-language-server
    just
  ];

  shellHook = ''
    echo "📦 expend-by-level dev shell"
    echo "   node $(node --version)"
    echo "   npm  $(npm --version)"
    echo ""
    echo "   just build   → npm run build"
    echo "   just clean   → clean dist/"
    echo "   just bump    → bump version & git tag"
    echo "   just dev     → npm run dev (Vite HMR)"
    echo ""
    npm install --silent 2>/dev/null
  '';
}
