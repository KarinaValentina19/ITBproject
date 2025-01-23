module IBT::IBTToken {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;

    struct IBT has key, store {
        id: UID,
        total_supply: u64,
    }

    public entry fun initialize(ctx: &mut TxContext) {
        let new_ibt = IBT {
            id: object::new(ctx), // Generate a unique ID for the token
            total_supply: 0,
        };
        transfer::transfer(new_ibt, tx_context::sender(ctx));
    }

    public entry fun mint(
        ibt: &mut IBT,
        amount: u64
    ) {
        assert!(amount > 0, 1); // Ensure the mint amount is greater than zero
        ibt.total_supply = ibt.total_supply + amount;
    }

    public entry fun burn(
        ibt: &mut IBT,
        amount: u64
    ) {
        assert!(amount > 0, 2); // Ensure the burn amount is greater than zero
        assert!(ibt.total_supply >= amount, 3); // Ensure there are enough tokens to burn
        ibt.total_supply = ibt.total_supply - amount;
    }

    public fun get_total_supply(ibt: &IBT): u64 {
        ibt.total_supply
    }
}
