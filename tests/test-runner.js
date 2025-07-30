#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Hotel Nepal Booking - Test Suite');
console.log('=====================================\n');

// Test categories
const testCategories = [
  {
    name: 'API Tests',
    path: 'tests/api',
    description: 'Testing API endpoints and responses'
  },
  {
    name: 'Unit Tests',
    path: 'tests/unit',
    description: 'Testing individual components and functions'
  },
  {
    name: 'Integration Tests',
    path: 'tests/integration',
    description: 'Testing component interactions'
  },
  {
    name: 'Utility Tests',
    path: 'tests/utils',
    description: 'Testing utility functions and helpers'
  }
];

// Generate test report
function generateTestReport() {
  console.log('📊 Test Report Summary');
  console.log('=====================');
  
  testCategories.forEach(category => {
    if (fs.existsSync(category.path)) {
      const testFiles = fs.readdirSync(category.path)
        .filter(file => file.endsWith('.test.js'));
      
      console.log(`${category.name}: ${testFiles.length} test file(s)`);
    }
  });
  
  console.log('\n🎯 Test Coverage:');
  console.log('   - API Tests: Endpoint and response testing');
  console.log('   - Unit Tests: Individual component testing');
  console.log('   - Integration Tests: Component interaction testing');
  console.log('   - Utility Tests: Helper function testing');
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log('Usage: node test-runner.js [options]');
    console.log('');
    console.log('Options:');
    console.log('  --report     Generate test report');
    console.log('  --help       Show this help message');
    console.log('');
    return;
  }
  
  // Generate report if requested
  if (args.includes('--report')) {
    generateTestReport();
    return;
  }
  
  // Default: show test structure
  console.log('📁 Test Structure:');
  testCategories.forEach(category => {
    if (fs.existsSync(category.path)) {
      const testFiles = fs.readdirSync(category.path)
        .filter(file => file.endsWith('.test.js'));
      
      console.log(`\n${category.name}:`);
      console.log(`   ${category.description}`);
      testFiles.forEach(file => {
        console.log(`   ✅ ${file}`);
      });
    }
  });
  
  console.log('\n🎉 Test suite is ready!');
  console.log('📝 Run tests with: npm test');
  console.log('📊 Generate report with: npm run test:report');
}

// Run the test suite
if (require.main === module) {
  main();
}

module.exports = {
  generateTestReport
}; 