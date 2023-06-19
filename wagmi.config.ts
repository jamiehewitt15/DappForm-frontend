import { defineConfig } from '@wagmi/cli'
import { etherscan, react } from '@wagmi/cli/plugins'
import Contract  from './src/components/Database.json'
import { goerli } from 'wagmi/chains'
import { erc20ABI } from 'wagmi'

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'erc20',
      abi: Contract.abi,
    },
  ],
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY!,
      chainId: goerli.id,
      contracts: [
        {
          name: 'EnsRegistry',
          address: {
            [goerli.id]: '0x314159265dd8dbb310642f98f50c066173c1259b'
          },
        },
      ],
    }),
    react(),
  ],
})
