import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DefaultEditor as WysiwygEditor } from 'react-simple-wysiwyg';
import {
  LayoutDashboard,
  Package,
  FileText,
  Users,
  Settings,
  LogOut,
  Plus,
  Search,
  Edit2,
  Trash2,
  Save,
  X,
  Upload,
  BarChart3,
  File,
  Bell,
  Shield,
  ChevronRight,
  Filter,
  Eye,
  TrendingUp,
  Globe,
  Briefcase,
  CheckSquare,
  Minus,
  Star,
  Activity,
  Info,
} from 'lucide-react';
import {
  MOCK_SOLUTIONS,
  MOCK_INITIATIVES,
  MOCK_USERS,
  MOCK_LOGS,
  MOCK_PROJECTS,
} from '../constants';
import {
  Solution,
  Initiative,
  Project,
  User,
  AuditLog,
  SolutionStatus,
  InitiativeType,
  KPI,
  Filiale,
  SolutionPhase,
  SolutionCost,
  SolutionCible,
  SolutionLevierValeur,
} from '../types';
import Button from './Button';

// --- Sub-components ---

const DashboardHome = ({
  solutions,
  users,
  logs,
  projects,
  initiatives,
}: {
  solutions: Solution[];
  users: User[];
  logs: AuditLog[];
  projects: Project[];
  initiatives: Initiative[];
}) => {
  const { t } = useTranslation();
  // Calculate total views and top content
  const totalViews = [...solutions, ...projects, ...initiatives].reduce(
    (acc, item) => acc + (item.views || 0),
    0,
  );

  const topContent = [
    ...solutions.map((s) => ({
      title: s.title,
      type: 'Solution',
      views: s.views || 0,
      id: s.id,
    })),
    ...projects.map((p) => ({
      title: p.title,
      type: 'Project',
      views: p.views || 0,
      id: p.id,
    })),
    ...initiatives.map((i) => ({
      title: i.name,
      type: 'Initiative',
      views: i.views || 0,
      id: i.id,
    })),
  ]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return (
    <div className='space-y-6 animate-fade-in'>
      <h2 className='text-2xl font-bold text-dark'>
        {t('admin.dashboardOverview')}
      </h2>

      {/* Metrics Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
          <div className='flex justify-between items-start mb-4'>
            <div className='p-2 bg-blue-50 text-blue-600 rounded-lg'>
              <Eye className='w-6 h-6' />
            </div>
            <span className='text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded'>
              +18%
            </span>
          </div>
          <h3 className='text-3xl font-bold text-dark mb-1'>
            {totalViews.toLocaleString()}
          </h3>
          <p className='text-sm text-gray-500'>{t('admin.totalPageViews')}</p>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
          <div className='flex justify-between items-start mb-4'>
            <div className='p-2 bg-orange-50 text-orange-600 rounded-lg'>
              <Package className='w-6 h-6' />
            </div>
            <span className='text-xs font-semibold text-gray-500 bg-gray-50 px-2 py-1 rounded'>
              0 new
            </span>
          </div>
          <h3 className='text-3xl font-bold text-dark mb-1'>
            {solutions.length}
          </h3>
          <p className='text-sm text-gray-500'>{t('admin.activeSolutions')}</p>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
          <div className='flex justify-between items-start mb-4'>
            <div className='p-2 bg-purple-50 text-purple-600 rounded-lg'>
              <Users className='w-6 h-6' />
            </div>
            <span className='text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded'>
              +2
            </span>
          </div>
          <h3 className='text-3xl font-bold text-dark mb-1'>{users.length}</h3>
          <p className='text-sm text-gray-500'>{t('admin.totalUsers')}</p>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
          <div className='flex justify-between items-start mb-4'>
            <div className='p-2 bg-green-50 text-green-600 rounded-lg'>
              <BarChart3 className='w-6 h-6' />
            </div>
          </div>
          <h3 className='text-3xl font-bold text-dark mb-1'>$42.50</h3>
          <p className='text-sm text-gray-500'>{t('admin.aiUsageCost')}</p>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Most Viewed Content (Matomo-style) */}
        <div className='lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
          <div className='flex justify-between items-center mb-6'>
            <h3 className='font-bold text-lg text-dark flex items-center gap-2'>
              <TrendingUp className='w-5 h-5 text-primary' />{' '}
              {t('admin.mostViewedContent')}
            </h3>
            <button className='text-sm text-primary hover:underline'>
              {t('admin.fullReport')}
            </button>
          </div>
          <div className='overflow-hidden'>
            <table className='w-full text-left'>
              <thead className='bg-gray-50 text-gray-500 text-xs uppercase font-semibold'>
                <tr>
                  <th className='px-4 py-3 rounded-l-lg'>
                    {t('admin.colTitle')}
                  </th>
                  <th className='px-4 py-3'>{t('admin.colType')}</th>
                  <th className='px-4 py-3 rounded-r-lg text-right'>
                    {t('admin.colViews')}
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-50'>
                {topContent.map((item, idx) => (
                  <tr
                    key={`${item.type}-${item.id}`}
                    className='hover:bg-gray-50 transition-colors'
                  >
                    <td className='px-4 py-3 font-medium text-dark text-sm'>
                      {item.title}
                    </td>
                    <td className='px-4 py-3'>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          item.type === 'Initiative'
                            ? 'bg-purple-100 text-purple-700'
                            : item.type === 'Solution'
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className='px-4 py-3 text-right text-sm font-bold text-gray-700'>
                      {item.views.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
          <h3 className='font-bold text-lg text-dark mb-6'>
            {t('admin.quickActions')}
          </h3>
          <div className='space-y-3'>
            <Button className='w-full justify-start gap-2' size='sm'>
              <Plus className='w-4 h-4' /> {t('admin.newSolution')}
            </Button>
            <Button
              className='w-full justify-start gap-2'
              variant='outline'
              size='sm'
            >
              <Upload className='w-4 h-4' /> {t('admin.uploadDocument')}
            </Button>
            <Button
              className='w-full justify-start gap-2'
              variant='outline'
              size='sm'
            >
              <Users className='w-4 h-4' /> {t('admin.manageUsers')}
            </Button>
          </div>

          <div className='mt-8 pt-6 border-t border-gray-100'>
            <h4 className='font-bold text-sm text-gray-400 uppercase tracking-wider mb-4'>
              {t('admin.liveInsights')}
            </h4>
            <div className='flex items-center justify-between text-sm mb-2'>
              <span className='flex items-center gap-2 text-gray-600'>
                <Globe className='w-4 h-4' /> {t('admin.onlineUsers')}
              </span>
              <span className='font-bold text-green-600'>12</span>
            </div>
            <div className='w-full bg-gray-100 h-1.5 rounded-full overflow-hidden'>
              <div className='bg-green-500 w-12 h-full rounded-full animate-pulse'></div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Log - Moved down */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h3 className='font-bold text-lg text-dark'>
            {t('admin.recentActivityLog')}
          </h3>
          <button className='text-sm text-primary hover:underline'>
            {t('admin.viewAll')}
          </button>
        </div>
        <div className='space-y-4'>
          {logs.slice(0, 5).map((log) => (
            <div
              key={log.id}
              className='flex items-start gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0'
            >
              <div
                className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                  log.action === 'Create'
                    ? 'bg-green-500'
                    : log.action === 'Delete'
                      ? 'bg-red-500'
                      : 'bg-blue-500'
                }`}
              />
              <div>
                <p className='text-sm text-dark font-medium'>
                  <span className='font-bold'>{log.user}</span>{' '}
                  {log.action.toLowerCase()}d {log.target}
                </p>
                <p className='text-xs text-gray-400 mt-1'>
                  {log.timestamp} {log.details && `• ${log.details}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SolutionsManager = ({
  solutions,
  setSolutions,
}: {
  solutions: Solution[];
  setSolutions: React.Dispatch<React.SetStateAction<Solution[]>>;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentSolution, setCurrentSolution] = useState<Partial<Solution>>({});
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSolutions = solutions.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.domain.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleEdit = (solution: Solution) => {
    setCurrentSolution(JSON.parse(JSON.stringify(solution))); // Deep copy for nested objects
    setIsEditing(true);
  };

  const updateArrayField = (field: keyof Solution, value: string) => {
    setCurrentSolution({
      ...currentSolution,
      [field]: value.split('\n').filter((line) => line.trim() !== ''),
    });
  };

  const updateKPI = (index: number, field: keyof KPI, value: string) => {
    const newKPIs = [...(currentSolution.keyFigures || [])];
    newKPIs[index] = { ...newKPIs[index], [field]: value };
    setCurrentSolution({ ...currentSolution, keyFigures: newKPIs });
  };

  const addKPI = () => {
    setCurrentSolution({
      ...currentSolution,
      keyFigures: [
        ...(currentSolution.keyFigures || []),
        { label: '', value: '', unit: '' },
      ],
    });
  };

  const removeKPI = (index: number) => {
    const newKPIs = [...(currentSolution.keyFigures || [])];
    newKPIs.splice(index, 1);
    setCurrentSolution({ ...currentSolution, keyFigures: newKPIs });
  };

  const handleCreate = () => {
    setCurrentSolution({
      status: SolutionStatus.Draft,
      labels: [],
      keyFigures: [],
      initiative: [],
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (currentSolution.id) {
      setSolutions((prev) =>
        prev.map((s) =>
          s.id === currentSolution.id
            ? ({
                ...s,
                ...currentSolution,
                lastModified: new Date().toISOString().split('T')[0],
              } as Solution)
            : s,
        ),
      );
    } else {
      const newId = (
        Math.max(...solutions.map((s) => parseInt(s.id))) + 1
      ).toString();
      setSolutions((prev) => [
        ...prev,
        {
          ...currentSolution,
          id: newId,
          slug: currentSolution.title?.toLowerCase().replace(/\s+/g, '-'),
          lastModified: new Date().toISOString().split('T')[0],
        } as Solution,
      ]);
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className='bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-bold'>
            {currentSolution.id ? 'Edit Solution' : 'New Solution'}
          </h2>
          <button
            onClick={() => setIsEditing(false)}
            className='p-2 hover:bg-gray-100 rounded-full'
          >
            <X className='w-5 h-5' />
          </button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Left Column: Header & Basic Info */}
          <div className='space-y-6'>
            <div className='bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4'>
              <h3 className='text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2'>
                <Globe className='w-4 h-4 text-primary' /> Header Information
              </h3>
              <div>
                <label className='block text-xs font-medium text-gray-500 mb-1'>
                  Title
                </label>
                <input
                  type='text'
                  className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none'
                  value={currentSolution.title || ''}
                  onChange={(e) =>
                    setCurrentSolution({
                      ...currentSolution,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className='block text-xs font-medium text-gray-500 mb-1'>
                  Subtitle
                </label>
                <input
                  type='text'
                  className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none'
                  value={currentSolution.subtitle || ''}
                  onChange={(e) =>
                    setCurrentSolution({
                      ...currentSolution,
                      subtitle: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className='block text-xs font-medium text-gray-500 mb-1'>
                  Filiale
                </label>
                <div className='flex flex-wrap gap-2 p-2 border rounded-lg bg-gray-50 max-h-32 overflow-y-auto'>
                  {Object.values(Filiale).map((f) => (
                    <label
                      key={f}
                      className='flex items-center gap-1.5 px-2 py-1 bg-white border rounded text-[10px] cursor-pointer hover:bg-gray-100 transition-colors'
                    >
                      <input
                        type='checkbox'
                        className='w-3 h-3 rounded border-gray-300 text-primary focus:ring-primary/20'
                        checked={currentSolution.sidebarInfo?.filiale?.includes(
                          f,
                        )}
                        onChange={() => {
                          const current =
                            currentSolution.sidebarInfo?.filiale || [];
                          const next = current.includes(f)
                            ? current.filter((t) => t !== f)
                            : [...current, f];
                          setCurrentSolution({
                            ...currentSolution,
                            sidebarInfo: {
                              ...(currentSolution.sidebarInfo || {}),
                              filiale: next,
                            },
                          });
                        }}
                      />
                      {f}
                    </label>
                  ))}
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-xs font-medium text-gray-500 mb-1'>
                    Domain
                  </label>
                  <select
                    className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none'
                    value={currentSolution.domain || ''}
                    onChange={(e) =>
                      setCurrentSolution({
                        ...currentSolution,
                        domain: e.target.value,
                      })
                    }
                  >
                    <option value=''>Select Domain</option>
                    <option value='Materials'>Materials</option>
                    <option value='Energy'>Energy</option>
                    <option value='Logistics'>Logistics</option>
                    <option value='Digital'>Digital</option>
                  </select>
                </div>
                <div>
                  <label className='block text-xs font-medium text-gray-500 mb-1'>
                    Status
                  </label>
                  <select
                    className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none'
                    value={currentSolution.status || SolutionStatus.Draft}
                    onChange={(e) =>
                      setCurrentSolution({
                        ...currentSolution,
                        status: e.target.value as SolutionStatus,
                      })
                    }
                  >
                    {Object.values(SolutionStatus).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Initiatives
              </label>
              <div className='flex flex-wrap gap-2 p-3 border rounded-xl bg-gray-50 max-h-40 overflow-y-auto'>
                {Object.values(InitiativeType).map((type) => (
                  <label
                    key={type}
                    className='flex items-center gap-1.5 px-3 py-1.5 bg-white border rounded-lg text-xs cursor-pointer hover:bg-gray-100 transition-colors'
                  >
                    <input
                      type='checkbox'
                      className='w-3.5 h-3.5 rounded border-gray-300 text-primary focus:ring-primary/20'
                      checked={currentSolution.initiative?.includes(type)}
                      onChange={() => {
                        const current = currentSolution.initiative || [];
                        const next = current.includes(type)
                          ? current.filter((t) => t !== type)
                          : [...current, type];
                        setCurrentSolution({
                          ...currentSolution,
                          initiative: next,
                        });
                      }}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Media */}
          <div className='space-y-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Labels (comma separated)
              </label>
              <input
                type='text'
                className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none'
                value={currentSolution.labels?.join(', ') || ''}
                onChange={(e) =>
                  setCurrentSolution({
                    ...currentSolution,
                    labels: e.target.value
                      .split(',')
                      .map((s) => s.trim())
                      .filter((s) => s !== ''),
                  })
                }
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Image URL
              </label>
              <input
                type='text'
                className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none'
                value={currentSolution.imageUrl || ''}
                onChange={(e) =>
                  setCurrentSolution({
                    ...currentSolution,
                    imageUrl: e.target.value,
                  })
                }
              />
            </div>
            {currentSolution.imageUrl && (
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Image Preview
                </label>
                <img
                  src={currentSolution.imageUrl}
                  alt='Preview'
                  className='w-full h-48 object-cover rounded-xl border border-gray-200'
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* New Sections for Detailed Info */}
        <div className='mt-8 pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Ratings */}
          <div className='space-y-4'>
            <h3 className='font-bold text-gray-900 flex items-center gap-2'>
              <Star className='w-4 h-4 text-primary' /> Ratings (1-5)
            </h3>
            <div className='grid grid-cols-1 gap-3'>
              {['valeur', 'complexite', 'maturite'].map((field) => (
                <div key={field} className='flex items-center justify-between'>
                  <label className='text-sm text-gray-600 capitalize'>
                    {field}
                  </label>
                  <input
                    type='number'
                    min='1'
                    max='5'
                    className='w-20 px-3 py-1 border rounded focus:ring-2 focus:ring-primary/20 outline-none'
                    value={
                      currentSolution.ratings?.[
                        field as keyof typeof currentSolution.ratings
                      ] || 1
                    }
                    onChange={(e) =>
                      setCurrentSolution({
                        ...currentSolution,
                        ratings: {
                          ...(currentSolution.ratings || {
                            valeur: 1,
                            complexite: 1,
                            maturite: 1,
                          }),
                          [field]: parseInt(e.target.value),
                        },
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Info Summary */}
          <div className='space-y-4'>
            <h3 className='font-bold text-gray-900 flex items-center gap-2'>
              <Settings className='w-4 h-4 text-primary' /> Technical Details
            </h3>
            <div className='space-y-2'>
              <input
                type='text'
                placeholder='Plateforme'
                className='w-full px-3 py-1 text-sm border rounded outline-none'
                value={currentSolution.sidebarInfo?.plateforme || ''}
                onChange={(e) =>
                  setCurrentSolution({
                    ...currentSolution,
                    sidebarInfo: {
                      ...(currentSolution.sidebarInfo || {}),
                      plateforme: e.target.value,
                    },
                  })
                }
              />
              <input
                type='text'
                placeholder='Algorithmes'
                className='w-full px-3 py-1 text-sm border rounded outline-none'
                value={currentSolution.sidebarInfo?.algorithmes || ''}
                onChange={(e) =>
                  setCurrentSolution({
                    ...currentSolution,
                    sidebarInfo: {
                      ...(currentSolution.sidebarInfo || {}),
                      algorithmes: e.target.value,
                    },
                  })
                }
              />
              <div className='grid grid-cols-2 gap-2'>
                <select
                  className='w-full px-3 py-1 text-sm border rounded outline-none'
                  value={currentSolution.sidebarInfo?.phase || ''}
                  onChange={(e) =>
                    setCurrentSolution({
                      ...currentSolution,
                      sidebarInfo: {
                        ...(currentSolution.sidebarInfo || {}),
                        phase: e.target.value as SolutionPhase,
                      },
                    })
                  }
                >
                  <option value=''>Select Phase</option>
                  {Object.values(SolutionPhase).map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <select
                  className='w-full px-3 py-1 text-sm border rounded outline-none'
                  value={currentSolution.sidebarInfo?.cout || ''}
                  onChange={(e) =>
                    setCurrentSolution({
                      ...currentSolution,
                      sidebarInfo: {
                        ...(currentSolution.sidebarInfo || {}),
                        cout: e.target.value as SolutionCost,
                      },
                    })
                  }
                >
                  <option value=''>Select Cost</option>
                  {Object.values(SolutionCost).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className='space-y-3'>
                <div className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>
                  Cible
                </div>
                <div className='flex flex-wrap gap-2'>
                  {Object.values(SolutionCible).map((c) => (
                    <label
                      key={c}
                      className='flex items-center gap-1.5 px-2 py-1 bg-gray-50 border rounded text-[10px] cursor-pointer hover:bg-gray-100 transition-colors'
                    >
                      <input
                        type='checkbox'
                        className='w-3 h-3 rounded border-gray-300 text-primary focus:ring-primary/20'
                        checked={currentSolution.sidebarInfo?.cible?.includes(
                          c,
                        )}
                        onChange={() => {
                          const current =
                            currentSolution.sidebarInfo?.cible || [];
                          const next = current.includes(c)
                            ? current.filter((t) => t !== c)
                            : [...current, c];
                          setCurrentSolution({
                            ...currentSolution,
                            sidebarInfo: {
                              ...(currentSolution.sidebarInfo || {}),
                              cible: next,
                            },
                          });
                        }}
                      />
                      {c}
                    </label>
                  ))}
                </div>
              </div>
              <div className='space-y-3'>
                <div className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>
                  Levier Valeur
                </div>
                <div className='flex flex-wrap gap-2'>
                  {Object.values(SolutionLevierValeur).map((l) => (
                    <label
                      key={l}
                      className='flex items-center gap-1.5 px-2 py-1 bg-gray-50 border rounded text-[10px] cursor-pointer hover:bg-gray-100 transition-colors'
                    >
                      <input
                        type='checkbox'
                        className='w-3 h-3 rounded border-gray-300 text-primary focus:ring-primary/20'
                        checked={currentSolution.sidebarInfo?.levierValeur?.includes(
                          l,
                        )}
                        onChange={() => {
                          const current =
                            currentSolution.sidebarInfo?.levierValeur || [];
                          const next = current.includes(l)
                            ? current.filter((t) => t !== l)
                            : [...current, l];
                          setCurrentSolution({
                            ...currentSolution,
                            sidebarInfo: {
                              ...(currentSolution.sidebarInfo || {}),
                              levierValeur: next,
                            },
                          });
                        }}
                      />
                      {l}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* KPIs Column */}
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <h3 className='font-bold text-gray-900 flex items-center gap-2'>
                <BarChart3 className='w-4 h-4 text-primary' /> Key Figures /
                KPIs
              </h3>
              <button
                onClick={addKPI}
                className='text-xs text-primary font-medium flex items-center gap-1 hover:underline'
              >
                <Plus className='w-3 h-3' /> Add
              </button>
            </div>
            <div className='space-y-3'>
              {currentSolution.keyFigures?.map((kpi, idx) => (
                <div
                  key={idx}
                  className='flex gap-2 items-center bg-gray-50 p-3 rounded-lg border border-gray-100'
                >
                  <div className='flex-1 space-y-2'>
                    <div className='flex gap-2'>
                      <input
                        placeholder='Value'
                        className='w-1/2 px-2 py-1 border rounded text-xs'
                        value={kpi.value}
                        onChange={(e) =>
                          updateKPI(idx, 'value', e.target.value)
                        }
                      />
                      <input
                        placeholder='Unit'
                        className='w-1/2 px-2 py-1 border rounded text-xs'
                        value={kpi.unit || ''}
                        onChange={(e) => updateKPI(idx, 'unit', e.target.value)}
                      />
                    </div>
                    <input
                      placeholder='Label'
                      className='w-full px-2 py-1 border rounded text-xs'
                      value={kpi.label}
                      onChange={(e) => updateKPI(idx, 'label', e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() => removeKPI(idx)}
                    className='text-red-500 hover:bg-red-50 p-1 rounded'
                  >
                    <Trash2 className='w-4 h-4' />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className='mt-8 pt-8 border-t border-gray-100'>
          <h3 className='font-bold text-gray-900 flex items-center gap-2 underline decoration-primary/30 mb-3'>
            <Info className='w-4 h-4 text-primary' /> Overview
          </h3>
          <textarea
            rows={4}
            className='w-full px-3 py-2 text-sm border rounded-xl outline-none focus:ring-1 focus:ring-primary/30 leading-relaxed'
            value={currentSolution.description || ''}
            onChange={(e) =>
              setCurrentSolution({
                ...currentSolution,
                description: e.target.value,
              })
            }
          />
        </div>

        {/* Rich HTML Sections */}
        <div className='mt-8 pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Use Case Section */}
          <div className='space-y-4'>
            <h3 className='font-bold text-gray-900 flex items-center gap-2 underline decoration-primary/30'>
              <FileText className='w-4 h-4 text-primary' /> Cas d'usage (rich
              HTML)
            </h3>
            <div className='border rounded-xl overflow-hidden'>
              <WysiwygEditor
                value={currentSolution.useCaseHtml || ''}
                onChange={(e) =>
                  setCurrentSolution({
                    ...currentSolution,
                    useCaseHtml: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Values & Gains Section */}
          <div className='space-y-4'>
            <h3 className='font-bold text-gray-900 flex items-center gap-2 underline decoration-primary/30'>
              <TrendingUp className='w-4 h-4 text-primary' /> Valeurs & Gains
              (rich HTML)
            </h3>
            <div className='border rounded-xl overflow-hidden'>
              <WysiwygEditor
                value={currentSolution.valuesGainsHtml || ''}
                onChange={(e) =>
                  setCurrentSolution({
                    ...currentSolution,
                    valuesGainsHtml: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className='mt-8 flex justify-end gap-3'>
          <Button variant='outline' onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className='w-4 h-4 mr-2' /> Save Solution
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6 animate-fade-in'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold text-dark'>Solutions Management</h2>
        <Button onClick={handleCreate} size='sm'>
          <Plus className='w-4 h-4 mr-2' /> New Solution
        </Button>
      </div>

      {/* Filters */}
      <div className='flex gap-4 mb-6'>
        <div className='relative flex-1 max-w-md'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
          <input
            type='text'
            placeholder='Search solutions...'
            className='w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className='p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600'>
          <Filter className='w-4 h-4' />
        </button>
      </div>

      {/* Table */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
        <table className='w-full text-left'>
          <thead className='bg-gray-50 text-gray-500 text-xs uppercase font-semibold'>
            <tr>
              <th className='px-6 py-4'>Title</th>
              <th className='px-6 py-4'>Domain</th>
              <th className='px-6 py-4'>Status</th>
              <th className='px-6 py-4'>Last Modified</th>
              <th className='px-6 py-4 text-right'>Actions</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {filteredSolutions.map((solution) => (
              <tr
                key={solution.id}
                className='hover:bg-gray-50 transition-colors'
              >
                <td className='px-6 py-4'>
                  <div className='font-medium text-dark'>{solution.title}</div>
                  <div className='text-xs text-gray-400 truncate max-w-[200px]'>
                    {solution.subtitle}
                  </div>
                </td>
                <td className='px-6 py-4 text-sm text-gray-600'>
                  {solution.domain}
                </td>
                <td className='px-6 py-4'>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      solution.status === SolutionStatus.Active
                        ? 'bg-green-100 text-green-700'
                        : solution.status === SolutionStatus.Beta
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {solution.status}
                  </span>
                </td>
                <td className='px-6 py-4 text-sm text-gray-500'>
                  {solution.lastModified || '2024-01-01'}
                </td>
                <td className='px-6 py-4 text-right flex justify-end gap-2'>
                  <button
                    onClick={() => handleEdit(solution)}
                    className='p-1.5 text-gray-500 hover:text-primary hover:bg-orange-50 rounded'
                  >
                    <Edit2 className='w-4 h-4' />
                  </button>
                  <button className='p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded'>
                    <Trash2 className='w-4 h-4' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredSolutions.length === 0 && (
          <div className='p-8 text-center text-gray-500'>
            No solutions found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

const InitiativesManager = ({
  initiatives,
  setInitiatives,
}: {
  initiatives: Initiative[];
  setInitiatives: React.Dispatch<React.SetStateAction<Initiative[]>>;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentInitiative, setCurrentInitiative] = useState<
    Partial<Initiative>
  >({});

  const handleEdit = (initiative: Initiative) => {
    setCurrentInitiative(JSON.parse(JSON.stringify(initiative))); // Deep copy for nested arrays
    setIsEditing(true);
  };

  const handleCreate = () => {
    setCurrentInitiative({
      keyFigures: [],
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (currentInitiative.id) {
      setInitiatives((prev) =>
        prev.map((i) =>
          i.id === currentInitiative.id
            ? ({ ...i, ...currentInitiative } as Initiative)
            : i,
        ),
      );
    } else {
      const newId =
        'i' +
        (
          Math.max(...initiatives.map((i) => parseInt(i.id.substring(1)))) + 1
        ).toString();
      setInitiatives((prev) => [
        ...prev,
        {
          ...currentInitiative,
          id: newId,
          slug: currentInitiative.name?.toLowerCase().replace(/\s+/g, '-'),
        } as Initiative,
      ]);
    }
    setIsEditing(false);
  };

  const updateKPI = (index: number, field: keyof KPI, value: string) => {
    const newKPIs = [...(currentInitiative.keyFigures || [])];
    newKPIs[index] = { ...newKPIs[index], [field]: value };
    setCurrentInitiative({ ...currentInitiative, keyFigures: newKPIs });
  };

  const addKPI = () => {
    setCurrentInitiative({
      ...currentInitiative,
      keyFigures: [
        ...(currentInitiative.keyFigures || []),
        { label: '', value: '', unit: '' },
      ],
    });
  };

  const removeKPI = (index: number) => {
    const newKPIs = [...(currentInitiative.keyFigures || [])];
    newKPIs.splice(index, 1);
    setCurrentInitiative({ ...currentInitiative, keyFigures: newKPIs });
  };

  if (isEditing) {
    return (
      <div className='bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-bold'>
            {currentInitiative.id ? 'Edit Initiative' : 'New Initiative'}
          </h2>
          <button
            onClick={() => setIsEditing(false)}
            className='p-2 hover:bg-gray-100 rounded-full'
          >
            <X className='w-5 h-5' />
          </button>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Name
              </label>
              <input
                type='text'
                className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none'
                value={currentInitiative.name || ''}
                onChange={(e) =>
                  setCurrentInitiative({
                    ...currentInitiative,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Type
              </label>
              <select
                className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none'
                value={currentInitiative.type || ''}
                onChange={(e) =>
                  setCurrentInitiative({
                    ...currentInitiative,
                    type: e.target.value as InitiativeType,
                  })
                }
              >
                <option value=''>Select Type</option>
                {Object.values(InitiativeType).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Featured Image URL
              </label>
              <input
                type='text'
                className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none'
                value={currentInitiative.featuredImage || ''}
                onChange={(e) =>
                  setCurrentInitiative({
                    ...currentInitiative,
                    featuredImage: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Theme Color
              </label>
              <div className='flex gap-2'>
                <input
                  type='color'
                  className='h-10 w-10 border rounded cursor-pointer'
                  value={currentInitiative.color || '#000000'}
                  onChange={(e) =>
                    setCurrentInitiative({
                      ...currentInitiative,
                      color: e.target.value,
                    })
                  }
                />
                <input
                  type='text'
                  className='flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none'
                  value={currentInitiative.color || ''}
                  onChange={(e) =>
                    setCurrentInitiative({
                      ...currentInitiative,
                      color: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className='border-t border-gray-100 pt-4 mt-4'>
              <div className='flex justify-between items-center mb-2'>
                <label className='block text-sm font-medium text-gray-700'>
                  Key Figures
                </label>
                <button
                  onClick={addKPI}
                  className='text-xs text-primary font-medium flex items-center gap-1 hover:underline'
                >
                  <Plus className='w-3 h-3' /> Add KPI
                </button>
              </div>
              <div className='space-y-3'>
                {currentInitiative.keyFigures?.map((kpi, idx) => (
                  <div key={idx} className='flex gap-2 items-center'>
                    <input
                      placeholder='Value'
                      className='w-1/3 px-3 py-1.5 border rounded text-sm'
                      value={kpi.value}
                      onChange={(e) => updateKPI(idx, 'value', e.target.value)}
                    />
                    <input
                      placeholder='Unit'
                      className='w-1/4 px-3 py-1.5 border rounded text-sm'
                      value={kpi.unit}
                      onChange={(e) => updateKPI(idx, 'unit', e.target.value)}
                    />
                    <input
                      placeholder='Label'
                      className='flex-1 px-3 py-1.5 border rounded text-sm'
                      value={kpi.label}
                      onChange={(e) => updateKPI(idx, 'label', e.target.value)}
                    />
                    <button
                      onClick={() => removeKPI(idx)}
                      className='text-red-500 hover:bg-red-50 p-1 rounded'
                    >
                      <Trash2 className='w-4 h-4' />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Description (Short)
              </label>
              <textarea
                rows={3}
                className='w-full px-4 py-2 border rounded-lg'
                value={currentInitiative.description || ''}
                onChange={(e) =>
                  setCurrentInitiative({
                    ...currentInitiative,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Overview
              </label>
              <textarea
                rows={3}
                className='w-full px-4 py-2 border rounded-lg'
                value={currentInitiative.overview || ''}
                onChange={(e) =>
                  setCurrentInitiative({
                    ...currentInitiative,
                    overview: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                The Problem
              </label>
              <textarea
                rows={3}
                className='w-full px-4 py-2 border rounded-lg'
                value={currentInitiative.problem || ''}
                onChange={(e) =>
                  setCurrentInitiative({
                    ...currentInitiative,
                    problem: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Our Solution
              </label>
              <textarea
                rows={3}
                className='w-full px-4 py-2 border rounded-lg'
                value={currentInitiative.solution || ''}
                onChange={(e) =>
                  setCurrentInitiative({
                    ...currentInitiative,
                    solution: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className='mt-8 flex justify-end gap-3'>
          <Button variant='outline' onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className='w-4 h-4 mr-2' /> Save Initiative
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6 animate-fade-in'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold text-dark'>Initiatives Management</h2>
        <Button onClick={handleCreate} size='sm'>
          <Plus className='w-4 h-4 mr-2' /> New Initiative
        </Button>
      </div>

      <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
        <table className='w-full text-left'>
          <thead className='bg-gray-50 text-gray-500 text-xs uppercase font-semibold'>
            <tr>
              <th className='px-6 py-4'>Name</th>
              <th className='px-6 py-4'>Type</th>
              <th className='px-6 py-4'>Description</th>
              <th className='px-6 py-4 text-right'>Views</th>
              <th className='px-6 py-4 text-right'>Actions</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {initiatives.map((initiative) => (
              <tr
                key={initiative.id}
                className='hover:bg-gray-50 transition-colors'
              >
                <td className='px-6 py-4'>
                  <div className='font-medium text-dark'>{initiative.name}</div>
                </td>
                <td className='px-6 py-4 text-sm text-gray-600'>
                  <span className='px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold'>
                    {initiative.type}
                  </span>
                </td>
                <td className='px-6 py-4 text-sm text-gray-500 max-w-xs truncate'>
                  {initiative.description}
                </td>
                <td className='px-6 py-4 text-right text-sm font-bold text-gray-600'>
                  {initiative.views?.toLocaleString()}
                </td>
                <td className='px-6 py-4 text-right flex justify-end gap-2'>
                  <button
                    onClick={() => handleEdit(initiative)}
                    className='p-1.5 text-gray-500 hover:text-primary hover:bg-orange-50 rounded'
                  >
                    <Edit2 className='w-4 h-4' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ProjectsManager = ({
  projects,
  setProjects,
  solutions,
}: {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  solutions: Solution[];
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({});
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleEdit = (project: Project) => {
    setCurrentProject({ ...project });
    setIsEditing(true);
  };

  const handleCreate = () => {
    setCurrentProject({
      relatedSolutions: [],
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (currentProject.id) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === currentProject.id
            ? ({ ...p, ...currentProject } as Project)
            : p,
        ),
      );
    } else {
      const newId =
        '1' +
        (
          Math.max(
            ...(projects.map((p) => parseInt(p.id.substring(1))) || [100]),
          ) + 1
        ).toString();
      setProjects((prev) => [
        ...prev,
        {
          ...currentProject,
          id: newId,
          slug: currentProject.title?.toLowerCase().replace(/\s+/g, '-'),
        } as Project,
      ]);
    }
    setIsEditing(false);
  };

  const toggleSolution = (solId: string) => {
    const currentRelated = currentProject.relatedSolutions || [];
    if (currentRelated.includes(solId)) {
      setCurrentProject({
        ...currentProject,
        relatedSolutions: currentRelated.filter((id) => id !== solId),
      });
    } else {
      setCurrentProject({
        ...currentProject,
        relatedSolutions: [...currentRelated, solId],
      });
    }
  };

  if (isEditing) {
    return (
      <div className='bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-bold'>
            {currentProject.id ? 'Edit Project' : 'New Project'}
          </h2>
          <button
            onClick={() => setIsEditing(false)}
            className='p-2 hover:bg-gray-100 rounded-full'
          >
            <X className='w-5 h-5' />
          </button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Title
              </label>
              <input
                type='text'
                className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none'
                value={currentProject.title || ''}
                onChange={(e) =>
                  setCurrentProject({
                    ...currentProject,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Location
              </label>
              <input
                type='text'
                className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none'
                value={currentProject.location || ''}
                onChange={(e) =>
                  setCurrentProject({
                    ...currentProject,
                    location: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Client
              </label>
              <input
                type='text'
                className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none'
                value={currentProject.client || ''}
                onChange={(e) =>
                  setCurrentProject({
                    ...currentProject,
                    client: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Image URL
              </label>
              <input
                type='text'
                className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none'
                value={currentProject.imageUrl || ''}
                onChange={(e) =>
                  setCurrentProject({
                    ...currentProject,
                    imageUrl: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Description
              </label>
              <textarea
                rows={6}
                className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none'
                value={currentProject.description || ''}
                onChange={(e) =>
                  setCurrentProject({
                    ...currentProject,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Related Solutions
              </label>
              <div className='max-h-40 overflow-y-auto border rounded-lg p-2 bg-gray-50 space-y-2'>
                {solutions.map((sol) => (
                  <label
                    key={sol.id}
                    className='flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded'
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${currentProject.relatedSolutions?.includes(sol.id) ? 'bg-primary border-primary' : 'bg-white border-gray-300'}`}
                    >
                      {currentProject.relatedSolutions?.includes(sol.id) && (
                        <CheckSquare className='w-3 h-3 text-white' />
                      )}
                    </div>
                    <input
                      type='checkbox'
                      className='hidden'
                      checked={
                        currentProject.relatedSolutions?.includes(sol.id) ||
                        false
                      }
                      onChange={() => toggleSolution(sol.id)}
                    />
                    <span className='text-sm text-gray-700'>{sol.title}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='mt-8 flex justify-end gap-3'>
          <Button variant='outline' onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className='w-4 h-4 mr-2' /> Save Project
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6 animate-fade-in'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold text-dark'>Projects Management</h2>
        <Button onClick={handleCreate} size='sm'>
          <Plus className='w-4 h-4 mr-2' /> New Project
        </Button>
      </div>

      {/* Filters */}
      <div className='flex gap-4 mb-6'>
        <div className='relative flex-1 max-w-md'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
          <input
            type='text'
            placeholder='Search projects...'
            className='w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
        <table className='w-full text-left'>
          <thead className='bg-gray-50 text-gray-500 text-xs uppercase font-semibold'>
            <tr>
              <th className='px-6 py-4'>Title</th>
              <th className='px-6 py-4'>Location</th>
              <th className='px-6 py-4'>Client</th>
              <th className='px-6 py-4 text-right'>Views</th>
              <th className='px-6 py-4 text-right'>Actions</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {filteredProjects.map((project) => (
              <tr
                key={project.id}
                className='hover:bg-gray-50 transition-colors'
              >
                <td className='px-6 py-4'>
                  <div className='font-medium text-dark'>{project.title}</div>
                </td>
                <td className='px-6 py-4 text-sm text-gray-600'>
                  {project.location}
                </td>
                <td className='px-6 py-4 text-sm text-gray-600'>
                  {project.client}
                </td>
                <td className='px-6 py-4 text-right text-sm font-bold text-gray-600'>
                  {project.views?.toLocaleString()}
                </td>
                <td className='px-6 py-4 text-right flex justify-end gap-2'>
                  <button
                    onClick={() => handleEdit(project)}
                    className='p-1.5 text-gray-500 hover:text-primary hover:bg-orange-50 rounded'
                  >
                    <Edit2 className='w-4 h-4' />
                  </button>
                  <button className='p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded'>
                    <Trash2 className='w-4 h-4' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProjects.length === 0 && (
          <div className='p-8 text-center text-gray-500'>
            No projects found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

const UsersManager = ({ users }: { users: User[] }) => (
  <div className='space-y-6 animate-fade-in'>
    <div className='flex justify-between items-center'>
      <h2 className='text-2xl font-bold text-dark'>User Management</h2>
      <Button size='sm'>
        <Plus className='w-4 h-4 mr-2' /> Add User
      </Button>
    </div>

    <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
      <table className='w-full text-left'>
        <thead className='bg-gray-50 text-gray-500 text-xs uppercase font-semibold'>
          <tr>
            <th className='px-6 py-4'>User</th>
            <th className='px-6 py-4'>Entity</th>
            <th className='px-6 py-4'>Role</th>
            <th className='px-6 py-4'>Status</th>
            <th className='px-6 py-4'>Last Login</th>
            <th className='px-6 py-4 text-right'>Actions</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-100'>
          {users.map((user) => (
            <tr key={user.id} className='hover:bg-gray-50'>
              <td className='px-6 py-4'>
                <div className='font-medium text-dark'>{user.name}</div>
                <div className='text-xs text-gray-400'>{user.email}</div>
              </td>
              <td className='px-6 py-4 text-sm text-gray-600'>{user.entity}</td>
              <td className='px-6 py-4 text-sm'>{user.role}</td>
              <td className='px-6 py-4'>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                >
                  {user.status}
                </span>
              </td>
              <td className='px-6 py-4 text-sm text-gray-500'>
                {user.lastLogin}
              </td>
              <td className='px-6 py-4 text-right flex justify-end gap-2'>
                <button className='p-1.5 text-gray-500 hover:text-primary rounded'>
                  <Edit2 className='w-4 h-4' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const SettingsPanel = () => (
  <div className='space-y-6 max-w-3xl animate-fade-in'>
    <h2 className='text-2xl font-bold text-dark'>Settings & Configuration</h2>

    <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6'>
      <h3 className='font-bold text-lg'>General Settings</h3>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Site Title
          </label>
          <input
            type='text'
            className='w-full px-3 py-2 border rounded-md'
            defaultValue='Bouygues Shape the Future'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Contact Email
          </label>
          <input
            type='email'
            className='w-full px-3 py-2 border rounded-md'
            defaultValue='contact@shape-the-future.com'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Default Language
          </label>
          <select className='w-full px-3 py-2 border rounded-md'>
            <option>English</option>
            <option>Français</option>
          </select>
        </div>
      </div>
    </div>

    <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6'>
      <h3 className='font-bold text-lg flex items-center gap-2'>
        <Shield className='w-5 h-5 text-primary' /> AI Configuration
      </h3>
      <div className='space-y-4'>
        <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
          <div>
            <div className='font-medium'>Enable AI Assistant</div>
            <div className='text-sm text-gray-500'>
              Allow users to interact with the chatbot
            </div>
          </div>
          <label className='relative inline-flex items-center cursor-pointer'>
            <input type='checkbox' className='sr-only peer' defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Gemini API Key
          </label>
          <input
            type='password'
            className='w-full px-3 py-2 border rounded-md bg-gray-50'
            defaultValue='sk-........................'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            System Prompt
          </label>
          <textarea
            className='w-full px-3 py-2 border rounded-md h-24 text-sm'
            defaultValue='You are the AI Assistant for Bouygues Shape the Future...'
          />
        </div>
      </div>
    </div>
  </div>
);

// --- Main Admin Component ---

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [solutions, setSolutions] = useState(MOCK_SOLUTIONS);
  const [initiatives, setInitiatives] = useState(MOCK_INITIATIVES);
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [users, setUsers] = useState(MOCK_USERS);
  const [logs, setLogs] = useState(MOCK_LOGS);

  const menuItems = [
    { id: 'dashboard', label: t('admin.dashboard'), icon: LayoutDashboard },
    { id: 'solutions', label: t('admin.solutions'), icon: Package },
    { id: 'documents', label: t('admin.documents'), icon: File },
    { id: 'users', label: t('admin.users'), icon: Users },
    { id: 'settings', label: t('admin.settings'), icon: Settings },
  ];

  return (
    <div className='min-h-screen bg-gray-50 flex font-sans'>
      {/* Sidebar */}
      <aside className='w-64 bg-secondary text-white flex flex-col fixed h-full z-10'>
        <div className='p-6 border-b border-gray-700 flex items-center gap-3'>
          <img
            src='/bouygues-logo.png'
            alt='Bouygues Logo'
            className='h-10 w-auto object-contain'
          />
          <div>
            <h1 className='font-bold'>{t('admin.backOffice')}</h1>
            <p className='text-xs text-gray-400'>{t('admin.shapeTheFuture')}</p>
          </div>
        </div>

        <nav className='flex-1 p-4 space-y-2'>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                activeTab === item.id
                  ? 'bg-primary text-white font-medium'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              <item.icon className='w-5 h-5' />
              {item.label}
            </button>
          ))}
        </nav>

        <div className='p-4 border-t border-gray-700'>
          <button
            onClick={() => (window.location.hash = '#/')}
            className='w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-400 hover:bg-white/5 transition-colors'
          >
            <LogOut className='w-5 h-5' />
            {t('admin.exitAdmin')}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className='ml-64 flex-1'>
        {/* Top bar */}
        <header className='bg-white h-16 border-b border-gray-200 flex justify-between items-center px-8 sticky top-0 z-10'>
          <div className='flex items-center text-sm text-gray-500'>
            <span className='capitalize'>{activeTab}</span>
          </div>
          <div className='flex items-center gap-4'>
            <button className='p-2 text-gray-400 hover:bg-gray-100 rounded-full relative'>
              <Bell className='w-5 h-5' />
              <span className='absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full'></span>
            </button>
            <div className='flex items-center gap-3 pl-4 border-l border-gray-200'>
              <div className='w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm'>
                A
              </div>
              <div className='text-sm'>
                <div className='font-medium text-dark'>
                  {t('admin.adminUser')}
                </div>
                <div className='text-xs text-gray-500'>
                  {t('admin.superAdmin')}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className='p-8'>
          {activeTab === 'dashboard' && (
            <DashboardHome
              solutions={solutions}
              users={users}
              logs={logs}
              projects={projects}
              initiatives={initiatives}
            />
          )}
          {activeTab === 'solutions' && (
            <SolutionsManager
              solutions={solutions}
              setSolutions={setSolutions}
            />
          )}
          {activeTab === 'initiatives' && (
            <InitiativesManager
              initiatives={initiatives}
              setInitiatives={setInitiatives}
            />
          )}
          {activeTab === 'projects' && (
            <ProjectsManager
              projects={projects}
              setProjects={setProjects}
              solutions={solutions}
            />
          )}
          {activeTab === 'users' && <UsersManager users={users} />}
          {activeTab === 'settings' && <SettingsPanel />}
          {activeTab === 'documents' && (
            <div className='flex flex-col items-center justify-center h-[50vh] text-gray-400'>
              <File className='w-16 h-16 mb-4 opacity-20' />
              <h3 className='text-lg font-medium'>
                {t('admin.documentsModule')}
              </h3>
              <p>{t('admin.documentsModuleDesc')}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
