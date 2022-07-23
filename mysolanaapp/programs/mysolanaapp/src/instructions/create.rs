use crate::state::base_account::*;
use anchor_lang::prelude::*;

pub fn create(ctx: Context<Create>) -> Result<()> {
    let base_account = &mut ctx.accounts.base_account;
    base_account.count = 0;
    Ok(())
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer = user, space = 16 + 16)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
