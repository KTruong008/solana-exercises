use anchor_lang::prelude::*;

use instructions::*;

pub mod instructions;
pub mod state;

// https://dev.to/edge-and-node/the-complete-guide-to-full-stack-solana-development-with-react-anchor-rust-and-phantom-3291

// solana address -k target/deploy/mysolanaapp-keypair.json
declare_id!("3pTzTnJL8fePPmq1dFyPyh2bcKeUqXC4fSRxe6B7edft");

#[program]
pub mod mysolanaapp {
    use super::*;

    pub fn create(ctx: Context<Create>) -> Result<()> {
        instructions::create::create(ctx)
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        instructions::increment::increment(ctx)
    }

    pub fn initialize(ctx: Context<Initialize>, data: String) -> Result<()> {
        instructions::initialize::initialize(ctx, data)
    }

    pub fn update(ctx: Context<Update>, data: String) -> Result<()> {
        instructions::update::update(ctx, data)
    }
}
