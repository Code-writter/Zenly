
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Mail, 
  Phone, 
  User, 
  Search, 
  SlidersHorizontal,
  Eye,
  ChevronDown,
  CheckCircle,
  XCircle,
  FileText,
  BarChart
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  matchScore: number;
  experience: number;
  education: string;
  skills: string[];
  missingSkills: string[];
  resumeUrl: string;
}

interface CandidateResultsProps {
  candidates: Candidate[];
  keySkills: string[];
  jobTitle: string;
}

const CandidateResults: React.FC<CandidateResultsProps> = ({ 
  candidates,
  keySkills,
  jobTitle
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [sortField, setSortField] = useState<keyof Candidate>('matchScore');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const toggleSelectAll = () => {
    if (selectedCandidates.length === candidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(candidates.map(c => c.id));
    }
  };
  
  const toggleSelect = (id: string) => {
    if (selectedCandidates.includes(id)) {
      setSelectedCandidates(selectedCandidates.filter(cId => cId !== id));
    } else {
      setSelectedCandidates([...selectedCandidates, id]);
    }
  };
  
  const handleSort = (field: keyof Candidate) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  const filteredCandidates = candidates
    .filter(candidate => 
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some(skill => 
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortField === 'matchScore' || sortField === 'experience') {
        return sortDirection === 'asc' 
          ? a[sortField] - b[sortField] 
          : b[sortField] - a[sortField];
      }
      
      const valueA = String(a[sortField]).toLowerCase();
      const valueB = String(b[sortField]).toLowerCase();
      
      if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  
  return (
    <div className="w-full">
      <Card className="shadow-md">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl text-[#0A2463]">
                Candidate Ranking
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                {candidates.length} candidates for <span className="font-medium">{jobTitle}</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search candidates..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Match Score: 80%+
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Match Score: 60-79%
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Match Score: &lt;60%
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Experience: 5+ years
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Experience: 2-5 years
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Experience: &lt;2 years
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <BarChart className="h-4 w-4 mr-2" />
                    Sort
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleSort('matchScore')}>
                    Match Score {sortField === 'matchScore' && (sortDirection === 'desc' ? '↓' : '↑')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort('experience')}>
                    Experience {sortField === 'experience' && (sortDirection === 'desc' ? '↓' : '↑')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort('name')}>
                    Name {sortField === 'name' && (sortDirection === 'desc' ? '↓' : '↑')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox 
                      checked={selectedCandidates.length === candidates.length}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Candidate</TableHead>
                  <TableHead className="hidden md:table-cell">Match Score</TableHead>
                  <TableHead className="hidden lg:table-cell">Experience</TableHead>
                  <TableHead className="hidden lg:table-cell">Key Skills</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.length > 0 ? (
                  filteredCandidates.map((candidate) => (
                    <TableRow key={candidate.id}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedCandidates.includes(candidate.id)}
                          onCheckedChange={() => toggleSelect(candidate.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-[#3E92CC] text-white flex items-center justify-center font-semibold mr-3">
                            {candidate.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{candidate.name}</div>
                            <div className="text-xs text-gray-500 flex flex-col sm:flex-row sm:gap-2">
                              <span className="flex items-center">
                                <Mail className="h-3 w-3 mr-1" />
                                {candidate.email}
                              </span>
                              <span className="hidden sm:flex items-center">
                                <Phone className="h-3 w-3 mr-1" />
                                {candidate.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center">
                          <div 
                            className={`h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-medium mr-2 ${
                              candidate.matchScore >= 80 
                                ? 'bg-green-500' 
                                : candidate.matchScore >= 60 
                                ? 'bg-yellow-500' 
                                : 'bg-red-500'
                            }`}
                          >
                            {candidate.matchScore}%
                          </div>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                candidate.matchScore >= 80 
                                  ? 'bg-green-500' 
                                  : candidate.matchScore >= 60 
                                  ? 'bg-yellow-500' 
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${candidate.matchScore}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span className="font-medium">{candidate.experience}</span> years
                        <div className="text-xs text-gray-500">{candidate.education}</div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {candidate.skills.slice(0, 3).map((skill, i) => (
                            <Badge key={i} variant="outline" className="text-xs bg-gray-100">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs bg-gray-100">
                              +{candidate.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Candidate Profile</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="md:col-span-2 space-y-4">
                                <div className="flex items-center">
                                  <div className="h-12 w-12 rounded-full bg-[#3E92CC] text-white flex items-center justify-center font-semibold text-lg mr-4">
                                    {candidate.name.charAt(0)}
                                  </div>
                                  <div>
                                    <h3 className="text-xl font-semibold">{candidate.name}</h3>
                                    <div className="text-sm text-gray-500 flex flex-col sm:flex-row sm:gap-4">
                                      <span className="flex items-center">
                                        <Mail className="h-4 w-4 mr-1" />
                                        {candidate.email}
                                      </span>
                                      <span className="flex items-center">
                                        <Phone className="h-4 w-4 mr-1" />
                                        {candidate.phone}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <h4 className="font-semibold">Experience</h4>
                                  <p className="text-sm">{candidate.experience} years of relevant experience</p>
                                  <p className="text-sm">{candidate.education}</p>
                                </div>
                                
                                <div className="space-y-2">
                                  <h4 className="font-semibold">Skills</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {candidate.skills.map((skill, i) => (
                                      <Badge key={i} variant="outline" className="bg-gray-100">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="text-xs"
                                  >
                                    <FileText className="h-3 w-3 mr-1" />
                                    View Resume
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="text-xs"
                                  >
                                    <Download className="h-3 w-3 mr-1" />
                                    Download
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="text-xs"
                                  >
                                    <User className="h-3 w-3 mr-1" />
                                    Contact
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <h4 className="font-semibold">Match Score</h4>
                                  <div className="flex items-center">
                                    <div 
                                      className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-medium mr-2 ${
                                        candidate.matchScore >= 80 
                                          ? 'bg-green-500' 
                                          : candidate.matchScore >= 60 
                                          ? 'bg-yellow-500' 
                                          : 'bg-red-500'
                                      }`}
                                    >
                                      {candidate.matchScore}%
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div 
                                        className={`h-2 rounded-full ${
                                          candidate.matchScore >= 80 
                                            ? 'bg-green-500' 
                                            : candidate.matchScore >= 60 
                                            ? 'bg-yellow-500' 
                                            : 'bg-red-500'
                                        }`}
                                        style={{ width: `${candidate.matchScore}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <h4 className="font-semibold">Required Skills</h4>
                                  <div className="space-y-1">
                                    {keySkills.map((skill, i) => {
                                      const hasSkill = candidate.skills.includes(skill);
                                      return (
                                        <div 
                                          key={i} 
                                          className="flex items-center text-sm"
                                        >
                                          {hasSkill ? (
                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                          ) : (
                                            <XCircle className="h-4 w-4 text-red-500 mr-2" />
                                          )}
                                          {skill}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                                
                                <div className="border-t pt-4 space-y-2">
                                  <h4 className="font-semibold">AI Analysis</h4>
                                  <p className="text-sm">
                                    This candidate has strong technical skills matching most job requirements. 
                                    {candidate.missingSkills.length > 0 && (
                                      <span>
                                        {' '}However, they lack experience in 
                                        <span className="font-medium">
                                          {' '}{candidate.missingSkills.join(', ')}
                                        </span>.
                                      </span>
                                    )}
                                  </p>
                                  <p className="text-sm">
                                    Based on experience and skill match, this candidate is a 
                                    <span className={`font-medium ${
                                      candidate.matchScore >= 80 
                                        ? 'text-green-600' 
                                        : candidate.matchScore >= 60 
                                        ? 'text-yellow-600' 
                                        : 'text-red-600'
                                    }`}>
                                      {' '}{candidate.matchScore >= 80 
                                        ? 'strong match' 
                                        : candidate.matchScore >= 60 
                                        ? 'moderate match' 
                                        : 'weak match'
                                      }{' '}
                                    </span>
                                    for this position.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No candidates match your search criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidateResults;
