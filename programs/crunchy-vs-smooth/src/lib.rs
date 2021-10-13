use anchor_lang::prelude::*;

declare_id!("6a2GdmttJdanBkoHt7f4Kon4hfadx4UTUgJeRkCaiL3U");
/// The Program ID can be found in /target/idl/[your_project_name].json
// 
/// This is where the magic happens. We define our program!
/// Each method inside here defines an RPC request handler (aka instruction handler) which can be invoked by clients
#[program]
mod crunchy_vs_smooth {
    use super::*;

    /// The first parameter for every RPC handler is the Context struct. We define Initialize and Vote below at #[derive(Accounts)]
    /// When `initalize` is called, we'll store the `vote_account_bump` that was used to derive our PDA so that others can easily derive it on their clients
    /// We no longer have to manually set both `crunchy` and `smooth` to 0 because we opted to use the `default` trait on our VotingState struct at the bottom of this file
    /// This a Rust trait that is used via #[derive(Default)]. More info on that here: https://doc.rust-lang.org/std/default/trait.Default.html
    pub fn initialize(ctx: Context<Initialize>, vote_account_bump: u8) -> ProgramResult {
        ctx.accounts.vote_account.bump = vote_account_bump;
        Ok(())
    }

    /// All our account validation logic is handled below at the #[account(...)] macros, letting us just focus our business logic
    pub fn vote_crunchy(ctx: Context<Vote>) -> ProgramResult {
        ctx.accounts.vote_account.crunchy += 1;
        Ok(())
    }

    pub fn vote_smooth(ctx: Context<Vote>) -> ProgramResult {
        ctx.accounts.vote_account.smooth += 1;
        Ok(())
    }
}

/// The #[derive(Accounts)] macro specifies all the accounts that are required for a given instruction
/// Here, we define two structs: Initialize and Vote
#[derive(Accounts)]
#[instruction(vote_account_bump: u8)]
pub struct Initialize<'info> {

    /// The #[account(...)] macro enforces that our `vote_account` owned by the currently executing program.
    /// 
    /// We mark `vote_account` with the `init` attribute, which creates a new account owned by the program
    /// When using `init`, we must also provide:
    /// `payer`, which funds the account creation
    /// and the `system_program` which is required by the runtime
    /// 
    /// If our account were to use variable length types like String or Vec we would also need to allocate `space` to our account
    /// Since we are only dealing with fixed-sized integers, we can leave out `space` and Anchor will calculate this for us automatically
    ///
    /// `seeds` and `bump` tell us that our `vote_account` is a PDA that can be derived from their respective values
    /// Account<'info, VotingState> tells us that it should be deserialized to the VotingState struct defined below at #[account]
    #[account(init, seeds = [b"vote_account".as_ref()], bump = vote_account_bump, payer = user)]
    vote_account: Account<'info, VotingState>,
    user: Signer<'info>,
    system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Vote<'info> {
    #[account(mut, seeds = [b"vote_account".as_ref()], bump = vote_account.bump)]
    vote_account: Account<'info, VotingState>,
}

/// Here we define what what the state of our `vote_account` looks like
/// We define a struct with three public properties: crunchy, smooth, and bump
/// The `crunchy` and `smooth` properties will keep track of their respective votes as unsigned 64-bit integers
/// `bump` will store the `vote_account_bump` we passed in when we initialized our program
/// This `bump` combined with our static "vote_account" seed will make it easy for anyone to derive the same PDA we use use to keep track of our state
/// All of this will be passed inside each Transaction Instruction to record votes as they occur
#[account]
#[derive(Default)]
pub struct VotingState {
    crunchy: u64,
    smooth: u64,
    bump: u8,
}