use anchor_lang::prelude::*;

#[account]
pub struct BaseAccount {
    pub count: u64,
    pub data: String,
    pub data_list: Vec<String>,
}
