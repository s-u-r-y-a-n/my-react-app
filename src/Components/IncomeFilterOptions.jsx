import React from 'react';
import { Input, FormGroup, Label } from 'reactstrap';
import "../Styles/IncomeFilterOptions.css";
import { useState } from 'react';
import { useEffect } from 'react';


const IncomeFilter = ({ searchTerm,
    setSearchTerm,
    startDate,
    setstartDate,
    endDate,
    setendDate,
    incomeTransactions,
    setFilteredTransactions,
    originalTransactions,
    setoriginalTransactions }) => {

    const [selectedCategory, setSelectedCategory] = useState("none");


    // Combine all filters (search term, category, and date range) in one useEffect
    useEffect(() => {
        const filtered = incomeTransactions.filter(transaction => {
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
    }, [searchTerm, selectedCategory, startDate, endDate, incomeTransactions]);


    function resetFilters() {
        setFilteredTransactions(originalTransactions);
        setstartDate("");
        setendDate("");
        setSearchTerm("");
        setSelectedCategory("none");
    }


    return (
        <>
            <div className="incomeFilterOptionsMainContainer">


                <FormGroup className="IncomeFilterOptions">
                    <Label for="searchByName"><b>Search By Transaction</b></Label>
                    <Input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search By Transaction, Category, Amount, Date..."
                        value={searchTerm}
                        className="IncomeFilterOptions"
                        id="searchByName"
                        style={{ width: "100%" }}
                    />
                </FormGroup>


                <FormGroup className="IncomeFilterOptions">
                    <Label for="searchByCategory"><b>Search By Category</b></Label>
                    <Input
                        name="select"
                        type="select"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="IncomeFilterOptions"
                        style={{ width: "100%" }}
                        id="searchByCategory"
                        value={selectedCategory}

                    >
                        <option value="none">Select the Category</option>
                        <option value="Income From Salary">Income From Salary</option>
                        <option value="Freelance Work">Freelance Work</option>
                        <option value="Income From Business or Profession">Income From Business or Profession</option>
                        <option value="Income from Property">Income from Property</option>
                        <option value="Income from Investments">Income from Investments</option>
                        <option value="Income From Other Sources">Income From Other Sources</option>
                    </Input>
                </FormGroup>


                <FormGroup className="IncomeFilterOptions">
                    <Label for="startDate"><b>Start Date</b></Label>
                    <Input
                        id="startDate"
                        name="Start Date"
                        type="date"
                        onChange={(e) => setstartDate(e.target.value)}
                        value={startDate}
                    />
                </FormGroup>

                <FormGroup className="IncomeFilterOptions">
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

export default IncomeFilter;
