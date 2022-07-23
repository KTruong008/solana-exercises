use crate::state::base_account::*;
use anchor_lang::prelude::*;

pub fn update(ctx: Context<Update>, data: String) -> Result<()> {
    let base_account = &mut ctx.accounts.base_account;
    let copy = data.clone();
    base_account.data = data;
    base_account.data_list.push(copy);
    Ok(())
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}
