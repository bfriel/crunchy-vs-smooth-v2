const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

describe("crunchy-vs-smooth", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.CrunchyVsSmooth;
  const baseAccount = anchor.web3.Keypair.generate();

  it("Initializes with 0 votes for crunchy and smooth", async () => {
    console.log("Testing Initialize...");
    await program.rpc.initialize({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    console.log("Crunchy: ", account.crunchy.toString());
    console.log("Smooth: ", account.smooth.toString());
    assert.ok(
      account.crunchy.toString() == 0 && account.smooth.toString() == 0
    );
  });
  it("Votes correctly for crunchy", async () => {
    console.log("Testing voteCrunchy...");
    await program.rpc.voteCrunchy({
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    console.log("Crunchy: ", account.crunchy.toString());
    console.log("Smooth: ", account.smooth.toString());

    assert.ok(
      account.crunchy.toString() == 1 && account.smooth.toString() == 0
    );
  });
  it("Votes correctly for smooth", async () => {
    console.log("Testing voteSmooth...");
    await program.rpc.voteSmooth({
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    console.log("Crunchy: ", account.crunchy.toString());
    console.log("Smooth: ", account.smooth.toString());

    assert.ok(
      account.crunchy.toString() == 1 && account.smooth.toString() == 1
    );
  });
});
