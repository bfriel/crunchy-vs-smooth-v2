use anchor_lang::prelude::*;

declare_id!("6a2GdmttJdanBkoHt7f4Kon4hfadx4UTUgJeRkCaiL3U");

#[program]
mod crunchy_vs_smooth {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, vote_account_bump: u8) -> ProgramResult {
        let vote_account = &mut ctx.accounts.vote_account;
        vote_account.crunchy = 0;
        vote_account.smooth = 0;
        vote_account.bump = vote_account_bump;
        Ok(())
    }

    pub fn vote_crunchy(ctx: Context<Vote>) -> ProgramResult {
        ctx.accounts.vote_account.crunchy += 1;
        Ok(())
    }

    pub fn vote_smooth(ctx: Context<Vote>) -> ProgramResult {
        ctx.accounts.vote_account.smooth += 1;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(vote_account_bump: u8)]
pub struct Initialize<'info> {
    // payer: Signer<'info>,
    user: Signer<'info>,
    // three 8's are required for each item in account struct
    #[account(init, seeds = [b"vote-account".as_ref()], bump = vote_account_bump, payer = user, space = 8 + 8 + 8 + 1)]
    vote_account: Account<'info, VotingState>,
    system_program: Program<'info, System>,
}

// #[derive(Accounts)]
// #[instruction(vote_account_bump: u8)]
// pub struct Initialize<'info> {
//     payer: Signer<'info>,
//     user: Signer<'info>,
//     // three 8's are required for each item in account struct
//     #[account(init, seeds = [b"vote-account".as_ref()], bump = vote_account_bump, payer = payer, space = 8 + 8 + 8 + 1)]
//     vote_account: Account<'info, VotingState>,
//     system_program: Program<'info, System>,
// }

#[derive(Accounts)]
pub struct Vote<'info> {
    // user: Signer<'info>,
    #[account(mut, seeds = [b"vote-account".as_ref()], bump = vote_account.bump)]
    vote_account: Account<'info, VotingState>,
}

#[account]
pub struct VotingState {
    crunchy: u64,
    smooth: u64,
    bump: u8,
}