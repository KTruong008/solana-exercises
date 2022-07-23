use crate::state::base_account::*;
use anchor_lang::prelude::*;

pub fn increment(ctx: Context<Increment>) -> Result<()> {
    let base_account = &mut ctx.accounts.base_account;
    base_account.count += 1;
    Ok(())
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}
