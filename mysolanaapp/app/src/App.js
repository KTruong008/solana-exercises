import { useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import idl from './idl.json';

import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
  useWallet,
  WalletProvider,
  ConnectionProvider,
} from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';

import './App.css';

require('@solana/wallet-adapter-react-ui/styles.css');

const wallets = [new PhantomWalletAdapter()];

const { SystemProgram, Keypair } = web3;

// Create an account
const baseAccount = Keypair.generate();
const opts = {
  preflightCommitment: 'processed',
};
const programID = new PublicKey(idl.metadata.address);

function App() {
  const [value, setValue] = useState(null);
  const wallet = useWallet();

  async function getProvider() {
    const network = `https://api.devnet.solana.com`;
    const connection = new Connection(network, opts.preflightCommitment);

    const provider = new AnchorProvider(
      connection,
      wallet,
      opts.preflightCommitment,
    );
    return provider;
  }

  async function createCounter() {
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    try {
      await program.methods
        .create()
        .accounts({
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([baseAccount])
        .rpc();

      const account = await program.account.baseAccount.fetch(
        baseAccount.publicKey,
      );
      console.log('account: ', account);
      setValue(account.count.toString());
    } catch (err) {
      console.log('Transaction error: ', err);
    }
  }

  async function increment() {
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    await program.methods
      .increment()
      .accounts({
        baseAccount: baseAccount.publicKey,
      })
      .rpc();

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey,
    );
    console.log('account: ', account);
    setValue(account.count.toString());
  }

  if (!wallet.connected) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '100px',
        }}
      >
        <WalletMultiButton />
      </div>
    );
  } else {
    return (
      <div className="App">
        <div>
          {!value && <button onClick={createCounter}>Create counter</button>}
          {value && <button onClick={increment}>Increment counter</button>}

          {value && value >= Number(0) ? (
            <h2>{value}</h2>
          ) : (
            <h3>Please create the counter.</h3>
          )}
        </div>
      </div>
    );
  }
}

const AppWithProvider = () => (
  <ConnectionProvider endpoint={`https://api.devnet.solana.com`}>
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <App />
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
);

export default AppWithProvider;
