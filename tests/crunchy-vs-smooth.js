const assert = require("assert");
const anchor = require("@project-serum/anchor");

describe("crunchy-vs-smooth", () => {
  // Configure the client
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.CrunchyVsSmooth;

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
        user: provider.wallet.publicKey,
        voteAccount: voteAccount,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
    });

    let currentVoteAccountState = await program.account.votingState.fetch(
      voteAccount
    );
    assert.equal(0, currentVoteAccountState.crunchy.toNumber());
    assert.equal(0, currentVoteAccountState.smooth.toNumber());
  });

  it("Votes correctly for crunchy", async () => {
    await program.rpc.voteCrunchy({
      accounts: {
        voteAccount: voteAccount,
      },
    });

    let currentVoteAccountState = await program.account.votingState.fetch(
      voteAccount
    );
    assert.equal(1, currentVoteAccountState.crunchy.toNumber());
    assert.equal(0, currentVoteAccountState.smooth.toNumber());
  });

  it("Votes correctly for smooth", async () => {
    await program.rpc.voteSmooth({
      accounts: {
        voteAccount: voteAccount,
      },
    });

    let currentVoteAccountState = await program.account.votingState.fetch(
      voteAccount
    );
    assert.equal(1, currentVoteAccountState.crunchy.toNumber());
    assert.equal(1, currentVoteAccountState.smooth.toNumber());
  });
});
