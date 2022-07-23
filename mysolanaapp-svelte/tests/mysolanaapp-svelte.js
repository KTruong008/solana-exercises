const assert = require('assert');
const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;

describe('mysolanaapp', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Mysolanaapp;
  let _baseAccount;

  it('Initializes the account', async () => {
    const baseAccount = anchor.web3.Keypair.generate();
    await program.methods
      .initialize('Hello world')
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

    console.log('Data: ', account.data);
    assert.ok(account.data === 'Hello world');
    _baseAccount = baseAccount;
  });

  it('Updates a previously created account', async () => {
    const baseAccount = _baseAccount;

    await program.methods
      .update('Some new data')
      .accounts({
        baseAccount: baseAccount.publicKey,
      })
      .rpc();

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey,
    );
    console.log('Updated data: ', account.data);
    assert.ok(account.data === 'Some new data');
    console.log('All account data: ', account);
    console.log('All data: ', account.dataList);
    assert.ok(account.dataList.length === 2);
  });

  // it('Creates a counter!', async () => {
  //   /**
  //    * Call the create function via RPC
  //    */
  //   const baseAccount = anchor.web3.Keypair.generate();

  //   await program.methods
  //     .create()
  //     .accounts({
  //       baseAccount: baseAccount.publicKey,
  //       user: provider.wallet.publicKey,
  //       systemProgram: SystemProgram.programId,
  //     })
  //     .signers([baseAccount])
  //     .rpc();

  //   /**
  //    * Fetch the account and check the value of count
  //    */
  //   const account = await program.account.baseAccount.fetch(
  //     baseAccount.publicKey,
  //   );
  //   console.log('Count 0: ', account.count.toString());
  //   assert.ok(account.count.toString() == 0);
  //   _baseAccount = baseAccount;
  // });

  // it('Increments the counter', async () => {
  //   const baseAccount = _baseAccount;

  //   await program.methods
  //     .increment()
  //     .accounts({
  //       baseAccount: baseAccount.publicKey,
  //     })
  //     .rpc();

  //   const account = await program.account.baseAccount.fetch(
  //     baseAccount.publicKey,
  //   );
  //   console.log('Count 1: ', account.count.toString());
  //   assert.ok(account.count.toString() == 1);
  // });
});
