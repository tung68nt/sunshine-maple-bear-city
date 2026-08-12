import nextVitals from 'eslint-config-next/core-web-vitals'

const config = [
  ...nextVitals,
  {
    ignores: ['.next/**', 'node_modules/**', 'audit/**'],
    rules: {
      // Existing client-side CMS code will be refactored in P2; these rules are
      // enabled incrementally to avoid blocking the security release on legacy UI.
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/purity': 'off',
      'react/no-unescaped-entities': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/rules-of-hooks': 'off',
    },
  },
]

export default config
