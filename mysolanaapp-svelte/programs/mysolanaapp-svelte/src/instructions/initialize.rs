use crate::state::base_account::*;
use anchor_lang::prelude::*;

pub fn initialize(ctx: Context<Initialize>, data: String) -> Result<()> {
    let base_account = &mut ctx.accounts.base_account;
    let copy = data.clone();
    base_account.data = data;
    base_account.data_list.push(copy);
    Ok(())
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 64 + 64)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
