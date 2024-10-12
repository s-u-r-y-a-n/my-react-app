import React, { useState, useEffect } from 'react';
import { Input, FormGroup, Label } from 'reactstrap';
import "../Styles/ExpenseFilterOptions.css";

const ExpensesFilterOptions = ({ searchTerm,
    setSearchTerm,
    startDate,
    setstartDate,
    endDate,
    setendDate,
    expenseTransactions,
    setFilteredTransactions,
    setoriginalTransactions,
    originalTransactions
}) => {
    const [selectedCategory, setSelectedCategory] = useState("none");

    // Combine all filters (search term, category, and date range) in one useEffect
    useEffect(() => {
        const filtered = expenseTransactions.filter(transaction => {
            // Filter by category
            const matchesCategory = selectedCategory === "none" || transaction.Category === selectedCategory;

            // Filter by search term
            const matchesSearchTerm =
                transaction.Transactions.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.Category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.Amount.toString().includes(searchTerm) ||
                transaction.Date.includes(searchTerm);

            // Filter by date range
            const transactionDate = new Date(transaction.Date);
            const isWithinDateRange =
                (!startDate || transactionDate >= new Date(startDate)) &&
                (!endDate || transactionDate <= new Date(endDate));

            // Combine all conditions
            return matchesCategory && matchesSearchTerm && isWithinDateRange;
        });

        setFilteredTransactions(filtered);
    }, [searchTerm, selectedCategory, startDate, endDate, expenseTransactions]);


    function resetFilters() {
        setFilteredTransactions(originalTransactions);
        setstartDate("");
        setendDate("");
        setSearchTerm("");
        setSelectedCategory("none");
    }


    return (
        <>
            <div className="ExpenseFilterOptionsMainContainer">
                {/* Search by Transaction */}
                <FormGroup className="ExpenseFilterOptions">
                    <Label for="searchByName"><b>Search By Transaction</b></Label>
                    <Input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search By Transaction, Category, Amount, Date..."
                        value={searchTerm}
                        className="ExpenseFilterOptions"
                        id="searchByName"
                        style={{ width: "100%" }}
                    />
                </FormGroup>

                {/* Filter by Category */}
                <FormGroup className="ExpenseFilterOptions">
                    <Label for="searchByCategory"><b>Search By Category</b></Label>
                    <Input
                        name="select"
                        type="select"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="ExpenseFilterOptions"
                        style={{ width: "100%" }}
                        id="searchByCategory"
                        value={selectedCategory}
                    >
                        <option value="none">Select the Category</option>
                        <option value="Food">Food</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Health">Health</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Personal Care">Personal Care</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                    </Input>
                </FormGroup>

                {/* Filter by Start Date */}
                <FormGroup className="ExpenseFilterOptions">
                    <Label for="startDate"><b>Start Date</b></Label>
                    <Input
                        id="startDate"
                        name="Start Date"
                        type="date"
                        onChange={(e) => setstartDate(e.target.value)}
                        value={startDate}
                    />
                </FormGroup>

                {/* Filter by End Date */}
                <FormGroup className="ExpenseFilterOptions">
                    <Label for="endDate"><b>End Date</b></Label>
                    <Input
                        id="endDate"
                        name="End Date"
                        type="date"
                        onChange={(e) => setendDate(e.target.value)}
                        value={endDate}
                    />
                </FormGroup>
            </div>

            <div className="resetFilterBtnParent">
                <button onClick={resetFilters} className="btn btn-warning">Reset All Filters</button>
            </div>
        </>
    );
};

export default ExpensesFilterOptions;
