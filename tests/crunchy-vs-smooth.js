const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

describe("crunchy-vs-smooth", () => {
  // Configure the client
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.CrunchyVsSmooth;
  const user = anchor.web3.Keypair.generate();

  let voteAccount, voteAccountBump;
  before(async () => {
    [voteAccount, voteAccountBump] =
      await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from(anchor.utils.bytes.utf8.encode("vote-account"))],
        program.programId
      );
  });

  it("Initializes with 0 votes for crunchy and smooth", async () => {
    await program.rpc.initialize(new anchor.BN(voteAccountBump), {
      accounts: {
        payer: provider.wallet.publicKey,
        user: user.publicKey,
        voteAccount: voteAccount,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [user],
    });

    let voteAccountAccount = await program.account.votingState.fetch(
      voteAccount
    );
    assert.equal(0, voteAccountAccount.crunchy.toNumber());
    assert.equal(0, voteAccountAccount.smooth.toNumber());
  });

  it("Votes correctly for crunchy", async () => {
    await program.rpc.voteCrunchy({
      accounts: {
        user: user.publicKey,
        voteAccount: voteAccount,
      },
      signers: [user],
    });

    let voteAccountAccount = await program.account.votingState.fetch(
      voteAccount
    );
    assert.equal(1, voteAccountAccount.crunchy.toNumber());
    assert.equal(0, voteAccountAccount.smooth.toNumber());
  });

  it("Votes correctly for smooth", async () => {
    await program.rpc.voteSmooth({
      accounts: {
        user: user.publicKey,
        voteAccount: voteAccount,
      },
      signers: [user],
    });

    let voteAccountAccount = await program.account.votingState.fetch(
      voteAccount
    );
    assert.equal(1, voteAccountAccount.crunchy.toNumber());
    assert.equal(1, voteAccountAccount.smooth.toNumber());
  });
});
