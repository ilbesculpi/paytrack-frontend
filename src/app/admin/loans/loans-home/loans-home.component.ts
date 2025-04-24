import { Component } from '@angular/core';
import { LoansService } from '../../../services';
import { Loan } from '../../../models';

@Component({
  selector: 'app-loans-home',
  templateUrl: './loans-home.component.html',
  styleUrl: './loans-home.component.scss'
})
export class LoansHomeComponent {

    isLoading: boolean = false;
    loans: Loan[] = [];
    displayMode: 'grid' | 'list' = 'grid';
    searchTerm: string = '';

    constructor(private loansService: LoansService) {
    }

    ngOnInit() {
        this.loadLoans();
    }

    get filteredLoans(): Loan[] {
        return this.loans.filter(loan => {
            return loan.customer.full_name.toLowerCase()
                .includes(this.searchTerm.toLowerCase());
        });
    }

    private loadLoans() {
        this.isLoading = true;
        this.loansService.getLoans()
            .subscribe({
                next: (loans) => {
                    console.log('loans', loans);
                    this.isLoading = false;
                    this.loans = loans;
                },
                error: (error) => {
                    this.isLoading = false;
                    console.error(error);
                }
            });
    }

}
