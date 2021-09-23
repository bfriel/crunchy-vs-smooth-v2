use anchor_lang::prelude::*;

declare_id!("7Ntd1GePKvSSYseiHqdk88k3mRLaQrMxmGnnoVpn8QQd");

#[program]
pub mod crunchy_vs_smooth {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;  
        base_account.crunchy = 0;
        base_account.smooth = 0;
        Ok(())
    }
    pub fn vote_crunchy(ctx: Context<Vote>) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        base_account.crunchy += 1;
        Ok(())
    }
    pub fn vote_smooth(ctx: Context<Vote>) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        base_account.smooth += 1;
        Ok(())
    }
}

// Transaction instructions
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 16 + 16)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program <'info, System>,
}

#[derive(Accounts)]
pub struct Vote<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}

// An account that goes inside a transaction instruction
#[account]
pub struct BaseAccount {
    pub crunchy: u64,
    pub smooth: u64,
}